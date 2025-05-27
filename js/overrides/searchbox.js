/**
 * @file
 * Provides the searchbox functionality.
 */

(function ($) {

  'use strict';

  Drupal.facets = Drupal.facets || {};

  Drupal.behaviors.facets_searchbox = {
    attach: function (context, settings) {

      const $facetsWidgetSearchbox = $('.facets-widget-searchbox', context);

      $facetsWidgetSearchbox.on("keyup", function () {
        let $targetList = $(this).next('.facets-widget-searchbox-list', context);
        let targetListId = $targetList.attr('data-drupal-facet-id');
        let $facetsWidgetSearchboxNoResult = $targetList.next('.facets-widget-searchbox-no-result', context);
        let $facetsSoftLimitLink = $targetList.next('.facets-soft-limit-link', context);
        if($facetsSoftLimitLink.length !== 0) {
          $facetsWidgetSearchboxNoResult = $facetsSoftLimitLink.next('.facets-widget-searchbox-no-result', context);
        }
        let filter = $(this).val().toUpperCase();
        let displayCount = 0;

        $("[data-drupal-facet-alias='" + targetListId + "'] li").each(function () {
          if (filter !== '') {
            search.call(this, filter, $targetList);
          } else {
            displayCount = resetSearch.call(this, $facetsSoftLimitLink, displayCount);
          }
        });

        handleNoResults(targetListId, $facetsWidgetSearchboxNoResult);
      });

      function search(filter, $targetList) {
        let value = $(this).find('.facet-item__value').html();

        if (value.toUpperCase().indexOf(filter) === 0) {
          if (!$(this).hasClass('hide-if-no-result')) {
            $(this).removeClass('d-none');
          }
        } else {
          if (!$(this).hasClass('facet-item--expanded')) {
            $(this).addClass('d-none')
          } else {
            $(this).addClass('hide-if-no-result');
          }
          $targetList.next('.facets-soft-limit-link', context).addClass('d-none');
        }
      }

      function resetSearch($facetsSoftLimitLink, displayCount) {
        if (!$(this).hasClass('hide-if-no-result')) {
          $(this).removeClass('d-none');
        }
        if ($facetsSoftLimitLink.length !== 0 && !$facetsSoftLimitLink.hasClass('open')) {
          if (displayCount >= 5) {
            if (!$(this).hasClass('facet-item--expanded')) {
              $facetsSoftLimitLink.addClass('d-none');
            }
            else {
              $(this).addClass('hide-if-no-result');
            }
          }
          else {
            if (!$(this).hasClass('hide-if-no-result')) {
              $facetsSoftLimitLink.removeClass('d-none');
            }
            displayCount += 1;
          }
        }
        $facetsSoftLimitLink.removeClass('d-none');
        return displayCount;
      }

      function handleNoResults(targetListId, $facetsWidgetSearchboxNoResult) {
        if ($("[data-drupal-facet-alias='" + targetListId + "'] li:visible:not(.hide-if-no-result)").length === 0) {
          $facetsWidgetSearchboxNoResult.removeClass('d-none');
          $('.hide-if-no-result').addClass('d-none');
        } else {
          $facetsWidgetSearchboxNoResult.addClass('d-none');
          $('.hide-if-no-result').removeClass('d-none');
        }
      }

    }
  };

})(jQuery);
