/*! lozad.js - v1.7.0 - 2019-02-25
* https://github.com/ApoorvSaxena/lozad.js
* Copyright (c) 2019 Apoorv Saxena; Licensed MIT */


(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.lozad = factory());
}(this, (function () { 'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  /**
   * Detect IE browser
   * @const {boolean}
   * @private
   */
  var isIE = typeof document !== 'undefined' && document.documentMode;

  var defaultConfig = {
    rootMargin: '0px',
    threshold: 0,
    load: function load(element) {
      if (element.nodeName.toLowerCase() === 'picture') {
        var imgEl = element.querySelector('img');
        if (imgEl === null) {
          // Check to see if there isn't already an img tag
          var img = document.createElement('img');
          if (isIE && element.getAttribute('data-iesrc')) {
            img.src = element.getAttribute('data-iesrc');
          }
          if (element.getAttribute('data-alt')) {
            img.alt = element.getAttribute('data-alt');
          }
          element.appendChild(img);
        } else {
          // Gets an array of source elements
          // Node list converted to array because some browsers don't support forEach on a node list
          var sourceElements = Array.prototype.slice.apply(element.querySelectorAll('source'));
          // Loop thrrough them all
          sourceElements.forEach(function (source) {
            // If there is a data-srcset attribute, make it a srcset attribute
            if (source.getAttribute('data-srcset')) {
              source.setAttribute('srcset', source.getAttribute('data-srcset'));
            }
          });
          if (imgEl.getAttribute('data-src')) {
            imgEl.src = imgEl.getAttribute('data-src');
          }
          if (imgEl.getAttribute('data-srcset')) {
            imgEl.setAttribute('srcset', imgEl.getAttribute('data-srcset'));
          }
        }
      }
      if (element.getAttribute('data-src')) {
        element.src = element.getAttribute('data-src');
      }
      if (element.getAttribute('data-srcset')) {
        element.setAttribute('srcset', element.getAttribute('data-srcset'));
      }
      if (element.getAttribute('data-background-image')) {
        element.style.backgroundImage = 'url(\'' + element.getAttribute('data-background-image') + '\')';
      }
      if (element.getAttribute('data-toggle-class')) {
        element.classList.toggle(element.getAttribute('data-toggle-class'));
      }
    },
    loaded: function loaded() {}
  };

  function markAsLoaded(element) {
    element.setAttribute('data-loaded', true);
  }

  var isLoaded = function isLoaded(element) {
    return element.getAttribute('data-loaded') === 'true';
  };

  var onIntersection = function onIntersection(load, loaded) {
    return function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.intersectionRatio > 0 || entry.isIntersecting) {
          observer.unobserve(entry.target);

          if (!isLoaded(entry.target)) {
            load(entry.target);
            markAsLoaded(entry.target);
            loaded(entry.target);
          }
        }
      });
    };
  };

  var getElements = function getElements(selector) {
    var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

    if (selector instanceof Element) {
      return [selector];
    }
    if (selector instanceof NodeList) {
      return selector;
    }
    return root.querySelectorAll(selector);
  };

  function lozad () {
    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.lozad';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _defaultConfig$option = _extends({}, defaultConfig, options),
        root = _defaultConfig$option.root,
        rootMargin = _defaultConfig$option.rootMargin,
        threshold = _defaultConfig$option.threshold,
        load = _defaultConfig$option.load,
        loaded = _defaultConfig$option.loaded;

    var observer = void 0;

    if (window.IntersectionObserver) {
      observer = new IntersectionObserver(onIntersection(load, loaded), {
        root: root,
        rootMargin: rootMargin,
        threshold: threshold
      });
    }

    return {
      observe: function observe() {
        var elements = getElements(selector, root);

        for (var i = 0; i < elements.length; i++) {
          if (isLoaded(elements[i])) {
            continue;
          }
          if (observer) {
            observer.observe(elements[i]);
            continue;
          }
          load(elements[i]);
          markAsLoaded(elements[i]);
          loaded(elements[i]);
        }
      },
      triggerLoad: function triggerLoad(element) {
        if (isLoaded(element)) {
          return;
        }

        load(element);
        markAsLoaded(element);
        loaded(element);
      },

      observer: observer
    };
  }

  return lozad;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG96YWQuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9sb3phZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIERldGVjdCBJRSBicm93c2VyXG4gKiBAY29uc3Qge2Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBpc0lFID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5kb2N1bWVudE1vZGVcblxuY29uc3QgZGVmYXVsdENvbmZpZyA9IHtcbiAgcm9vdE1hcmdpbjogJzBweCcsXG4gIHRocmVzaG9sZDogMCxcbiAgbG9hZChlbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3BpY3R1cmUnKSB7XG4gICAgICBjb25zdCBpbWdFbCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignaW1nJylcbiAgICAgIGlmIChpbWdFbCA9PT0gbnVsbCkgeyAvLyBDaGVjayB0byBzZWUgaWYgdGhlcmUgaXNuJ3QgYWxyZWFkeSBhbiBpbWcgdGFnXG4gICAgICAgIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgICAgIGlmIChpc0lFICYmIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWllc3JjJykpIHtcbiAgICAgICAgICBpbWcuc3JjID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWVzcmMnKVxuICAgICAgICB9XG4gICAgICAgIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1hbHQnKSkge1xuICAgICAgICAgIGltZy5hbHQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1hbHQnKVxuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoaW1nKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gR2V0cyBhbiBhcnJheSBvZiBzb3VyY2UgZWxlbWVudHNcbiAgICAgICAgLy8gTm9kZSBsaXN0IGNvbnZlcnRlZCB0byBhcnJheSBiZWNhdXNlIHNvbWUgYnJvd3NlcnMgZG9uJ3Qgc3VwcG9ydCBmb3JFYWNoIG9uIGEgbm9kZSBsaXN0XG4gICAgICAgIGNvbnN0IHNvdXJjZUVsZW1lbnRzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc291cmNlJykpXG4gICAgICAgIC8vIExvb3AgdGhycm91Z2ggdGhlbSBhbGxcbiAgICAgICAgc291cmNlRWxlbWVudHMuZm9yRWFjaChzb3VyY2UgPT4ge1xuICAgICAgICAgIC8vIElmIHRoZXJlIGlzIGEgZGF0YS1zcmNzZXQgYXR0cmlidXRlLCBtYWtlIGl0IGEgc3Jjc2V0IGF0dHJpYnV0ZVxuICAgICAgICAgIGlmIChzb3VyY2UuZ2V0QXR0cmlidXRlKCdkYXRhLXNyY3NldCcpKSB7XG4gICAgICAgICAgICBzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmNzZXQnLCBzb3VyY2UuZ2V0QXR0cmlidXRlKCdkYXRhLXNyY3NldCcpKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgaWYgKGltZ0VsLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKSkge1xuICAgICAgICAgIGltZ0VsLnNyYyA9IGltZ0VsLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKVxuICAgICAgICB9XG4gICAgICAgIGlmIChpbWdFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3Jjc2V0JykpIHtcbiAgICAgICAgICBpbWdFbC5zZXRBdHRyaWJ1dGUoJ3NyY3NldCcsIGltZ0VsLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmNzZXQnKSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJykpIHtcbiAgICAgIGVsZW1lbnQuc3JjID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJylcbiAgICB9XG4gICAgaWYgKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXNyY3NldCcpKSB7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnc3Jjc2V0JywgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3Jjc2V0JykpXG4gICAgfVxuICAgIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1iYWNrZ3JvdW5kLWltYWdlJykpIHtcbiAgICAgIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgnJHtlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1iYWNrZ3JvdW5kLWltYWdlJyl9JylgXG4gICAgfVxuICAgIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS10b2dnbGUtY2xhc3MnKSkge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRvZ2dsZS1jbGFzcycpKVxuICAgIH1cbiAgfSxcbiAgbG9hZGVkKCkge31cbn1cblxuZnVuY3Rpb24gbWFya0FzTG9hZGVkKGVsZW1lbnQpIHtcbiAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtbG9hZGVkJywgdHJ1ZSlcbn1cblxuY29uc3QgaXNMb2FkZWQgPSBlbGVtZW50ID0+IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWxvYWRlZCcpID09PSAndHJ1ZSdcblxuY29uc3Qgb25JbnRlcnNlY3Rpb24gPSAobG9hZCwgbG9hZGVkKSA9PiAoZW50cmllcywgb2JzZXJ2ZXIpID0+IHtcbiAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICBpZiAoZW50cnkuaW50ZXJzZWN0aW9uUmF0aW8gPiAwIHx8IGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICBvYnNlcnZlci51bm9ic2VydmUoZW50cnkudGFyZ2V0KVxuXG4gICAgICBpZiAoIWlzTG9hZGVkKGVudHJ5LnRhcmdldCkpIHtcbiAgICAgICAgbG9hZChlbnRyeS50YXJnZXQpXG4gICAgICAgIG1hcmtBc0xvYWRlZChlbnRyeS50YXJnZXQpXG4gICAgICAgIGxvYWRlZChlbnRyeS50YXJnZXQpXG4gICAgICB9XG4gICAgfVxuICB9KVxufVxuXG5jb25zdCBnZXRFbGVtZW50cyA9IChzZWxlY3Rvciwgcm9vdCA9IGRvY3VtZW50KSA9PiB7XG4gIGlmIChzZWxlY3RvciBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcbiAgICByZXR1cm4gW3NlbGVjdG9yXVxuICB9XG4gIGlmIChzZWxlY3RvciBpbnN0YW5jZW9mIE5vZGVMaXN0KSB7XG4gICAgcmV0dXJuIHNlbGVjdG9yXG4gIH1cbiAgcmV0dXJuIHJvb3QucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcilcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHNlbGVjdG9yID0gJy5sb3phZCcsIG9wdGlvbnMgPSB7fSkge1xuICBjb25zdCB7cm9vdCwgcm9vdE1hcmdpbiwgdGhyZXNob2xkLCBsb2FkLCBsb2FkZWR9ID0gey4uLmRlZmF1bHRDb25maWcsIC4uLm9wdGlvbnN9XG4gIGxldCBvYnNlcnZlclxuXG4gIGlmICh3aW5kb3cuSW50ZXJzZWN0aW9uT2JzZXJ2ZXIpIHtcbiAgICBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihvbkludGVyc2VjdGlvbihsb2FkLCBsb2FkZWQpLCB7XG4gICAgICByb290LFxuICAgICAgcm9vdE1hcmdpbixcbiAgICAgIHRocmVzaG9sZFxuICAgIH0pXG4gIH1cblxuICByZXR1cm4ge1xuICAgIG9ic2VydmUoKSB7XG4gICAgICBjb25zdCBlbGVtZW50cyA9IGdldEVsZW1lbnRzKHNlbGVjdG9yLCByb290KVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpc0xvYWRlZChlbGVtZW50c1tpXSkpIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICAgIGlmIChvYnNlcnZlcikge1xuICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoZWxlbWVudHNbaV0pXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICBsb2FkKGVsZW1lbnRzW2ldKVxuICAgICAgICBtYXJrQXNMb2FkZWQoZWxlbWVudHNbaV0pXG4gICAgICAgIGxvYWRlZChlbGVtZW50c1tpXSlcbiAgICAgIH1cbiAgICB9LFxuICAgIHRyaWdnZXJMb2FkKGVsZW1lbnQpIHtcbiAgICAgIGlmIChpc0xvYWRlZChlbGVtZW50KSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgbG9hZChlbGVtZW50KVxuICAgICAgbWFya0FzTG9hZGVkKGVsZW1lbnQpXG4gICAgICBsb2FkZWQoZWxlbWVudClcbiAgICB9LFxuICAgIG9ic2VydmVyXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJpc0lFIiwiZG9jdW1lbnQiLCJkb2N1bWVudE1vZGUiLCJkZWZhdWx0Q29uZmlnIiwicm9vdE1hcmdpbiIsInRocmVzaG9sZCIsImxvYWQiLCJlbGVtZW50Iiwibm9kZU5hbWUiLCJ0b0xvd2VyQ2FzZSIsImltZ0VsIiwicXVlcnlTZWxlY3RvciIsImltZyIsImNyZWF0ZUVsZW1lbnQiLCJnZXRBdHRyaWJ1dGUiLCJzcmMiLCJhbHQiLCJhcHBlbmRDaGlsZCIsInNvdXJjZUVsZW1lbnRzIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImFwcGx5IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJzb3VyY2UiLCJzZXRBdHRyaWJ1dGUiLCJzdHlsZSIsImJhY2tncm91bmRJbWFnZSIsImNsYXNzTGlzdCIsInRvZ2dsZSIsImxvYWRlZCIsIm1hcmtBc0xvYWRlZCIsImlzTG9hZGVkIiwib25JbnRlcnNlY3Rpb24iLCJlbnRyaWVzIiwib2JzZXJ2ZXIiLCJlbnRyeSIsImludGVyc2VjdGlvblJhdGlvIiwiaXNJbnRlcnNlY3RpbmciLCJ1bm9ic2VydmUiLCJ0YXJnZXQiLCJnZXRFbGVtZW50cyIsInNlbGVjdG9yIiwicm9vdCIsIkVsZW1lbnQiLCJOb2RlTGlzdCIsIm9wdGlvbnMiLCJ3aW5kb3ciLCJJbnRlcnNlY3Rpb25PYnNl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
