<?php
/*
Plugin Name: My Chart.js Dashboard Widget
Description: Adds a dashboard widget using Chart.js, ReactJS, and WP REST API.
Version: 1.0.0
Author: Nikunj Sharma
*/

// Enqueue your custom style
wp_enqueue_style('my-chartjs-dashboard-widget-style', plugin_dir_url(__FILE__) . 'my-recharts-widget-style2.css');
// Enqueue your custom script
// Enqueue your custom script
function my_chartjs_dashboard_widget_enqueue_scripts() {
  wp_enqueue_script('my-chartjs-dashboard-widget-script', plugin_dir_url(__FILE__) . 'my-recharts-widget-script2.js', array('jquery'), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'my_chartjs_dashboard_widget_enqueue_scripts');



// Shortcode function
function my_chartjs_dashboard_widget_shortcode() {
  ob_start();
  ?>
  <div id="my-chartjs-widget-container"></div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/17.0.2/umd/react.production.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@3.5.0/dist/chart.min.js"></script>
  <?php
  return ob_get_clean();
}
add_shortcode('my_recharts_dashboard_widget', 'my_chartjs_dashboard_widget_shortcode');
