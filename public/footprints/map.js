(function () {
  var config = window.MXIAOCAO_MAP_CONFIG || {};
  var places = window.MXIAOCAO_FOOTPRINTS.places;
  var routes = window.MXIAOCAO_FOOTPRINTS.routes;

  var els = {
    empty: document.getElementById("mapEmptyState"),
    placeCount: document.getElementById("mapPlaceCount"),
    placeList: document.getElementById("placeList"),
    routeList: document.getElementById("routeList"),
    placeSection: document.getElementById("placeSection"),
    routeSection: document.getElementById("routeSection"),
    tagFilter: document.getElementById("mapTagFilter"),
    yearFilter: document.getElementById("mapYearFilter"),
    playBtn: document.getElementById("routePlayBtn"),
    resetBtn: document.getElementById("routeResetBtn")
  };

  var map = null;
  var stopMapMonitor = null;
  var infoWindow = null;
  var markers = {};
  var routeLine = null;
  var activeRouteId = routes.length > 0 ? routes[0].id : null;
  var routeTimer = null;
  var routeGeneration = 0;
  var lightboxState = {
    images: [],
    index: 0
  };

  function byId(id) {
    return places.find(function (place) { return place.id === id; });
  }

  function uniq(list) {
    return Array.from(new Set(list));
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;" })[char];
    });
  }

  function placeVisits(place) {
    var visits = [];
    if (place.date) {
      visits.push({
        date: place.date,
        description: place.description || "",
        photos: place.photos || []
      });
    }

    if (place.visits) {
      place.visits.forEach(function (visit) {
        if (!visit.date) return;
        visits.push({
          date: visit.date,
          description: visit.description || "",
          photos: visit.photos || []
        });
      });
    }

    return visits.sort(function (a, b) {
      return b.date.localeCompare(a.date);
    });
  }

  function placeKindLabel(place) {
    if (place.kind === "food") return "美食";
    if (place.kind === "shop") return "店铺";
    if (place.kind === "transit") return "交通点";
    return "收藏点";
  }

  function allYears(place) {
    return placeVisits(place).map(function (visit) { return visit.date.slice(0, 4); });
  }

  function getFilteredPlaces() {
    var tag = els.tagFilter.value;
    var year = els.yearFilter.value;
    return places.filter(function (place) {
      var tagOk = tag === "all" || place.tags.indexOf(tag) !== -1;
      var yearOk = year === "all" || allYears(place).indexOf(year) !== -1;
      return tagOk && yearOk;
    });
  }

  function renderFilters() {
    var tags = uniq(places.reduce(function (all, place) { return all.concat(place.tags); }, [])).sort();
    var years = uniq(places.reduce(function (all, place) { return all.concat(allYears(place)); }, [])).sort().reverse();
    els.tagFilter.innerHTML = '<option value="all">全部标签</option>' + tags.map(function (tag) {
      return '<option value="' + escapeHtml(tag) + '">' + escapeHtml(tag) + '</option>';
    }).join("");
    els.yearFilter.innerHTML = '<option value="all">全部年份</option>' + years.map(function (year) {
      return '<option value="' + escapeHtml(year) + '">' + escapeHtml(year) + '</option>';
    }).join("");
  }

  function totalPhotos(place) {
    var visitPhotos = placeVisits(place).reduce(function (n, visit) {
      return n + visit.photos.length;
    }, 0);

    return visitPhotos || (place.photos || []).length;
  }

  function placeCard(place) {
    var visits = placeVisits(place);
    var dateText = visits.length ? escapeHtml(visits[0].date) : placeKindLabel(place);
    var visitsText = visits.length > 1 ? ' · ' + visits.length + ' 组照片' : '';
    return '<article tabindex="0" role="button" class="place-item" data-place-id="' + escapeHtml(place.id) + '">' +
      '<h3>' + escapeHtml(place.name) + '</h3>' +
      '<div class="place-meta"><span>' + dateText + visitsText + '</span><span>' + totalPhotos(place) + ' 张照片</span></div>' +
      '<div class="place-tags">' + place.tags.map(function (tag) { return '<span>' + escapeHtml(tag) + '</span>'; }).join("") + '</div>' +
      '</article>';
  }

  function routeCard(route) {
    var stops = route.placeIds.map(byId).filter(Boolean);
    return '<article tabindex="0" role="button" class="route-item' + (route.id === activeRouteId ? ' active' : '') + '" data-route-id="' + escapeHtml(route.id) + '">' +
      '<h3>' + escapeHtml(route.title) + '</h3>' +
      '<div class="route-meta"><span>' + escapeHtml(route.date) + '</span><span>' + stops.length + ' 个地点</span></div>' +
      '</article>';
  }

  function renderLists() {
    var filtered = getFilteredPlaces();
    els.placeCount.textContent = filtered.length;
    els.placeList.innerHTML = filtered.map(placeCard).join("");
    els.routeList.innerHTML = routes.map(routeCard).join("");
    syncMarkers(filtered);
    if (!filtered.length) els.placeList.innerHTML = "<p>没有匹配的地点。</p>";
  }

  function showPlace(place) {
    if (map && infoWindow) {
      infoWindow.setContent(infoContent(place));
      infoWindow.open(map, place.coord);
      map.panTo(place.coord);
    } else {
      els.empty.innerHTML = infoContent(place);
      els.empty.classList.remove("hidden");
    }
  }

  function photosGrid(photos) {
    if (!photos.length) return '';
    return '<div class="amap-photo-grid">' + photos.map(function (src) {
      return '<div class="amap-photo-link"><img src="' + escapeHtml(src) + '" alt="" data-lightbox-src="' + escapeHtml(src) + '"></div>';
    }).join("") + '</div>';
  }

  function closeLightbox() {
    var overlay = document.getElementById('map-lightbox');
    if (!overlay) return;
    overlay.classList.remove('map-lightbox--visible');
    document.body.classList.remove('map-lightbox-open');
    if (map && map.setStatus) {
      map.setStatus({
        scrollWheel: true,
        dragEnable: true,
        keyboardEnable: true,
        doubleClickZoom: true
      });
    }
  }

  function isInsidePhotoWindow(target) {
    return target && target.closest && target.closest('.amap-photo-window');
  }

  function renderLightbox(images, index) {
    var overlay = document.getElementById('map-lightbox');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'map-lightbox';
      overlay.className = 'map-lightbox';
      overlay.innerHTML = '<div class="map-lightbox-bg"></div><div class="map-lightbox-panel"><button class="map-lightbox-close" type="button">&times;</button><img class="map-lightbox-img" src="" alt=""><div class="map-lightbox-strip"></div></div>';
      document.body.appendChild(overlay);
      overlay.querySelector('.map-lightbox-bg').addEventListener('click', closeLightbox);
      overlay.querySelector('.map-lightbox-close').addEventListener('click', closeLightbox);
      overlay.querySelector('.map-lightbox-strip').addEventListener('click', function (event) {
        var button = event.target.closest('[data-lightbox-index]');
        if (!button) return;
        lightboxState.index = parseInt(button.dataset.lightboxIndex, 10) || 0;
        renderLightbox(lightboxState.images, lightboxState.index);
      });
    }

    lightboxState.images = images.slice();
    lightboxState.index = Math.max(0, Math.min(index, images.length - 1));

    var mainImage = overlay.querySelector('.map-lightbox-img');
    var strip = overlay.querySelector('.map-lightbox-strip');
    mainImage.src = images[lightboxState.index] || images[0];
    strip.innerHTML = images.map(function (src, i) {
      return '<button class="map-lightbox-thumb' + (i === lightboxState.index ? ' active' : '') + '" type="button" data-lightbox-index="' + i + '"><img src="' + escapeHtml(src) + '" alt=""></button>';
    }).join('');

    document.body.classList.add('map-lightbox-open');
    overlay.classList.add('map-lightbox--visible');
    if (map && map.setStatus) {
      map.setStatus({
        scrollWheel: false,
        dragEnable: false,
        keyboardEnable: false,
        doubleClickZoom: false
      });
    }
  }

  function infoContent(place) {
    var html = '<div class="amap-photo-window">' +
      '<h3>' + escapeHtml(place.name) + '</h3>';
    var visits = placeVisits(place);

    if (visits.length > 1) {
      html += '<div class="amap-visit-count">' + visits.length + ' 组照片</div>';
      visits.forEach(function (visit) {
        html += '<div class="amap-visit-section">' +
          '<div class="amap-visit-head">' + escapeHtml(visit.date) + '</div>' +
          '<p>' + escapeHtml(visit.description || '') + '</p>' +
          photosGrid(visit.photos) +
          '</div>';
      });
    } else if (visits.length === 1) {
      html += '<p>' + escapeHtml(visits[0].date) + ' · ' + escapeHtml(visits[0].description || '') + '</p>' +
        photosGrid(visits[0].photos);
    } else {
      html += '<div class="amap-visit-count">' + escapeHtml(placeKindLabel(place)) + '</div>' +
        '<p>' + escapeHtml(place.description || '') + '</p>' +
        photosGrid(place.photos || []);
    }
    html += '</div>';
    return html;
  }

  document.addEventListener('click', function (e) {
    var img = e.target.closest('.amap-photo-link img');
    if (!img) return;
    var src = img.getAttribute('data-lightbox-src');
    if (!src) return;
    var grid = img.closest('.amap-photo-grid');
    var images = grid ? Array.from(grid.querySelectorAll('img[data-lightbox-src]')).map(function (node) {
      return node.getAttribute('data-lightbox-src');
    }) : [src];
    var index = images.indexOf(src);
    renderLightbox(images, index < 0 ? 0 : index);
    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape') {
        closeLightbox();
        document.removeEventListener('keydown', escHandler);
      }
    });
  });

  function syncMarkers(visiblePlaces) {
    if (!map || !window.AMap) return;
    var visibleIds = visiblePlaces.map(function (place) { return place.id; });
    places.forEach(function (place) {
      if (!markers[place.id]) {
        var marker = new AMap.Marker({
          position: place.coord,
          title: place.name,
          anchor: "bottom-center"
        });
        marker.on("click", function () {
          infoWindow.setContent(infoContent(place));
          infoWindow.open(map, place.coord);
        });
        markers[place.id] = marker;
      }
      if (visibleIds.indexOf(place.id) !== -1) {
        map.add(markers[place.id]);
      } else {
        map.remove(markers[place.id]);
      }
    });
  }

  function resetRoute() {
    routeGeneration++;
    if (routeTimer) window.clearInterval(routeTimer);
    routeTimer = null;
    if (els.playBtn) els.playBtn.innerHTML = '播放路线';
    if (map && routeLine) {
      var center = config.center || [120.1551, 30.2741];
      routeLine.setOptions({ strokeOpacity: 0 });
      routeLine.setPath([center, center]);
    }
  }

  // Fetch walking path between adjacent stops
  function fetchSegmentPath(fromCoord, toCoord) {
    return new Promise(function (resolve) {
      var timeout = setTimeout(fallback, 10000);
      function fallback() {
        clearTimeout(timeout);
        resolve([
          [fromCoord[0], fromCoord[1]],
          [toCoord[0], toCoord[1]]
        ]);
      }

      AMap.plugin("AMap.Walking", function () {
        if (!AMap.Walking) {
          fallback();
          return;
        }

        var walking = new AMap.Walking({ hideMarkers: true });
        walking.search(fromCoord, toCoord, function (status, result) {
          clearTimeout(timeout);
          if (status === 'complete' && result.routes && result.routes.length > 0) {
            var path = [];
            result.routes[0].steps.forEach(function (step) {
              step.path.forEach(function (p) { path.push(p); });
            });
            resolve(path);
          } else {
            fallback();
          }
        });
      });
    });
  }

  // Build full route path from walking directions
  function buildRoutePath(stops) {
    var segmentTasks = [];
    for (var i = 0; i < stops.length - 1; i++) {
      segmentTasks.push(fetchSegmentPath(stops[i].coord, stops[i + 1].coord));
    }

    return Promise.all(segmentTasks).then(function (segments) {
      var flat = [];
      segments.forEach(function (seg) {
        seg.forEach(function (p) {
          if (flat.length === 0 ||
              flat[flat.length - 1][0] !== p[0] ||
              flat[flat.length - 1][1] !== p[1]) {
            flat.push(p);
          }
        });
      });
      return flat;
    });
  }

  function pointToArray(point) {
    if (Array.isArray(point)) return point;
    if (point && typeof point.getLng === "function" && typeof point.getLat === "function") {
      return [point.getLng(), point.getLat()];
    }
    return [point.lng, point.lat];
  }

  function distanceMeters(a, b) {
    a = pointToArray(a);
    b = pointToArray(b);
    var lat1 = a[1] * Math.PI / 180;
    var lat2 = b[1] * Math.PI / 180;
    var dLat = lat2 - lat1;
    var dLng = (b[0] - a[0]) * Math.PI / 180;
    var sinLat = Math.sin(dLat / 2);
    var sinLng = Math.sin(dLng / 2);
    var h = sinLat * sinLat + Math.cos(lat1) * Math.cos(lat2) * sinLng * sinLng;
    return 6371000 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  }

  function interpolatePoint(a, b, ratio) {
    a = pointToArray(a);
    b = pointToArray(b);
    return [
      a[0] + (b[0] - a[0]) * ratio,
      a[1] + (b[1] - a[1]) * ratio
    ];
  }

  function routeLengthMeters(path) {
    var total = 0;
    for (var i = 1; i < path.length; i++) {
      total += distanceMeters(path[i - 1], path[i]);
    }
    return total;
  }

  function resamplePathByDistance(path, stepMeters) {
    if (path.length < 2) return path;
    var sampled = [pointToArray(path[0])];
    var carried = 0;

    for (var i = 1; i < path.length; i++) {
      var from = pointToArray(path[i - 1]);
      var to = pointToArray(path[i]);
      var segmentLength = distanceMeters(from, to);
      if (segmentLength === 0) continue;

      while (carried + segmentLength >= stepMeters) {
        var ratio = (stepMeters - carried) / segmentLength;
        var next = interpolatePoint(from, to, ratio);
        sampled.push(next);
        from = next;
        segmentLength = distanceMeters(from, to);
        carried = 0;
      }

      carried += segmentLength;
    }

    var last = pointToArray(path[path.length - 1]);
    var tail = sampled[sampled.length - 1];
    if (tail[0] !== last[0] || tail[1] !== last[1]) sampled.push(last);
    return sampled;
  }

  function playRoute() {
    if (!map || !window.AMap) return;
    resetRoute();
    var route = routes.find(function (item) { return item.id === activeRouteId; });
    if (!route) return;
    var stops = route.placeIds.map(byId).filter(Boolean);
    if (stops.length < 2) return;

    els.playBtn && (els.playBtn.innerHTML = '规划路线...');
    var generation = routeGeneration;
    buildRoutePath(stops).then(function (animatedPath) {
      if (generation !== routeGeneration) return;
      if (animatedPath.length < 2) {
        els.playBtn && (els.playBtn.innerHTML = '播放路线');
        return;
      }
      var routeMeters = routeLengthMeters(animatedPath);
      var durationMs = Math.max(16000, Math.min(90000, routeMeters * 5));
      var frameMs = 90;
      var stepMeters = Math.max(8, routeMeters / Math.ceil(durationMs / frameMs));
      var playbackPath = resamplePathByDistance(animatedPath, stepMeters);
      var current = 1;
      routeLine.setOptions({ strokeOpacity: 0.92 });
      routeLine.setPath([playbackPath[0]]);
      map.setZoomAndCenter(Math.max(map.getZoom(), 12), stops[0].coord);
      els.playBtn && (els.playBtn.innerHTML = '播放中');

      routeTimer = window.setInterval(function () {
        current += 1;
        routeLine.setPath(playbackPath.slice(0, current));
        if (current % 14 === 0) map.panTo(playbackPath[current - 1]);
        if (current >= playbackPath.length) {
          window.clearInterval(routeTimer);
          routeTimer = null;
          els.playBtn && (els.playBtn.innerHTML = '重新播放');
          var last = stops[stops.length - 1];
          infoWindow.setContent(infoContent(last));
          infoWindow.open(map, last.coord);
        }
      }, frameMs);
    });
  }

  function bindEvents() {
    document.querySelectorAll("[data-map-mode]").forEach(function (button) {
      button.addEventListener("click", function () {
        document.querySelectorAll("[data-map-mode]").forEach(function (btn) { btn.classList.remove("active"); });
        button.classList.add("active");
        var showRoutes = button.dataset.mapMode === "routes";
        els.placeSection.classList.toggle("hidden", showRoutes);
        els.routeSection.classList.toggle("hidden", !showRoutes);
      });
    });

    els.placeList.addEventListener("click", function (event) {
      var item = event.target.closest("[data-place-id]");
      if (!item) return;
      var place = byId(item.dataset.placeId);
      if (place) showPlace(place);
    });

    if (els.routeList) {
      els.routeList.addEventListener("click", function (event) {
        var item = event.target.closest("[data-route-id]");
        if (!item) return;
        activeRouteId = item.dataset.routeId;
        resetRoute();
        renderLists();
      });
    }

    els.tagFilter.addEventListener("change", renderLists);
    els.yearFilter.addEventListener("change", renderLists);
    els.playBtn && els.playBtn.addEventListener("click", playRoute);
    [els.placeList, els.routeList].forEach(function (list) { list.addEventListener("keydown", function (event) { if ((event.key === "Enter" || event.key === " ") && event.target.matches("[role=button]")) { event.preventDefault(); event.target.click(); } }); });
    els.resetBtn && els.resetBtn.addEventListener("click", resetRoute);
  }

  function loadAmap() {
    return new Promise(function (resolve, reject) {
      if (!config.amapKey) {
        reject(new Error("missing amap key"));
        return;
      }
      if (config.securityJsCode) {
        window._AMapSecurityConfig = { securityJsCode: config.securityJsCode };
      }
      var script = document.createElement("script");
      script.src = "https://webapi.amap.com/maps?v=2.0&key=" + encodeURIComponent(config.amapKey);
      var timeout = setTimeout(function () { reject(new Error("map timeout")); }, 15000);
      script.onload = function () { clearTimeout(timeout); resolve(); };
      script.onerror = function () { clearTimeout(timeout); reject(new Error("map unavailable")); };
      document.head.appendChild(script);
    });
  }

  function monitorBasemap(instance, ready, failed) {
    var disposed = false;
    var timeout = setTimeout(onTimeout, 15000);
    function onTimeout() { if (!disposed) failed(); }
    function onReady() { if (!disposed) { clearTimeout(timeout); ready(); } }
    function onError() { if (!disposed) { clearTimeout(timeout); failed(); } }
    instance.on("complete", onReady);
    instance.on("error", onError);
    return function () {
      disposed = true;
      clearTimeout(timeout);
      instance.off("complete", onReady);
      instance.off("error", onError);
    };
  }

  function showMapFailure() {
    if (els.empty.querySelector(".amap-photo-window")) return;
    els.empty.innerHTML = '<div><h3>底图未能加载</h3><p>地点和照片仍可查看。请检查网络、地图 Key 的域名白名单和安全码后重试。</p><button type="button" id="retryMap">重新加载地图</button></div>';
    els.empty.classList.remove("hidden");
    document.getElementById("retryMap").onclick = function () { window.location.reload(); };
  }

  function initMap() {
    map = new AMap.Map("amapContainer", {
      zoom: config.zoom || 12,
      center: config.center || [120.1551, 30.2741],
      viewMode: "2D",
      resizeEnable: true
    });
    els.empty.classList.add("map-status-compact");
    els.empty.innerHTML = '<p>底图加载中…</p>';
    stopMapMonitor = monitorBasemap(map, function () { els.empty.classList.add("hidden"); }, showMapFailure);
    AMap.plugin(["AMap.Scale", "AMap.ToolBar"], function () {
      map.addControl(new AMap.Scale());
      map.addControl(new AMap.ToolBar({ position: "RB" }));
    });
    infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -28) });
    // Keep scroll and drag gestures inside the photo popup instead of passing them to the map.
    document.addEventListener('mouseover', function (e) {
      if (isInsidePhotoWindow(e.target)) {
        map.setStatus({ scrollWheel: false, dragEnable: false });
      }
    });
    document.addEventListener('mouseout', function (e) {
      var leavingPhotoWindow = isInsidePhotoWindow(e.target);
      var enteringPhotoWindow = isInsidePhotoWindow(e.relatedTarget);
      if (leavingPhotoWindow && !enteringPhotoWindow) {
        map.setStatus({ scrollWheel: true, dragEnable: true });
      }
    });
    ["wheel", "pointerdown", "pointermove", "touchstart", "touchmove", "mousedown"].forEach(function (eventName) {
      document.addEventListener(eventName, function (e) {
        if (isInsidePhotoWindow(e.target)) e.stopPropagation();
      }, true);
    });
    routeLine = new AMap.Polyline({
      path: [config.center || [120.1551, 30.2741], config.center || [120.1551, 30.2741]],
      strokeColor: "#e94560",
      strokeWeight: 6,
      strokeOpacity: 0,
      lineJoin: "round",
      lineCap: "round",
      showDir: true
    });
    map.add(routeLine);
    renderLists();
  }

  function syncTheme() {
    var dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    try { if (window.parent !== window) dark = window.parent.document.documentElement.classList.contains("dark"); } catch (_) {}
    document.documentElement.classList.toggle("dark", dark);
  }
  syncTheme();
  var themeMedia = window.matchMedia("(prefers-color-scheme: dark)");
  themeMedia.addEventListener("change", syncTheme);
  var themeObserver;
  try {
    if (window.parent !== window) {
      themeObserver = new MutationObserver(syncTheme);
      themeObserver.observe(window.parent.document.documentElement, { attributes: true, attributeFilter: ["class"] });
    }
  } catch (_) {}
  window.addEventListener("pagehide", function () {
    resetRoute();
    themeMedia.removeEventListener("change", syncTheme);
    if (themeObserver) themeObserver.disconnect();
    if (stopMapMonitor) stopMapMonitor();
    if (map) map.destroy();
  });
  renderFilters();
  bindEvents();
  renderLists();
  loadAmap().then(initMap).catch(showMapFailure);
})();
