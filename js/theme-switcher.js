/**
 * @file
 * Global utilities.
 *
 */
(function($, Drupal) {

  'use strict';

  Drupal.behaviors.archipelago_subtheme_chiloe_theme_switcher = {
    attach: function (context, settings) {
      once('theme-color', 'html', context).forEach(function (element) {
          const themeToggler = document.getElementById("themeToggler");
          // add listener to theme toggler
          if (themeToggler) {
            themeToggler.addEventListener("change", (e) => {
              toggleTheme(e.target.checked);
            });
          }

          const toggleTheme = (isChecked) => {
            const theme = isChecked ? "dark" : "light";
            setThemeInfo(isChecked);
            document.documentElement.setAttribute('data-bs-theme', theme);
            setTheme(theme);
          }

          const setThemeInfo = (isChecked) => {
            const theme_label = isChecked ? "Dark mode" : "Light Mode";
            const themeLabel = document.getElementById('themeLabel');
            if (themeLabel) {
              themeLabel.textContent = theme_label;
            }
            if (themeToggler) {
              themeToggler.setAttribute('aria-label', theme_label)
            }
          }

          const getPreferredTheme = () => {
            const storedTheme = localStorage.getItem("theme")
            if (storedTheme) {
              return storedTheme
            }
            return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
          }
          const setTheme = theme => {
            if (theme === "auto") {
              document.documentElement.setAttribute("data-bs-theme", (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"))
            } else {
              document.documentElement.setAttribute("data-bs-theme", theme)
              localStorage.setItem("theme", theme);
            }
          }

          // add listener to toggle theme with Shift + D
          if (themeToggler) {
            document.addEventListener("keydown", (e) => {
              if (e.shiftKey && e.key === "D") {
                themeToggler.checked = !themeToggler.checked;
                toggleTheme(themeToggler.checked);
              }
            });
          }
          const isSystemThemeSetToDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
          const isSystemThemeSetToDarkSaved = getPreferredTheme();
          // set toggler position based on system theme
          if (isSystemThemeSetToDark || isSystemThemeSetToDarkSaved == 'dark') {
            if (themeToggler) {
              themeToggler.checked = true;
            }
            setThemeInfo(true);
          }
        }



      )
    }
  }
})(jQuery, Drupal);
