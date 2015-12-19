# jQuery-GoogleRoute
Simple jQuery plugin for calculating route on GoogleMap from the current user location to the destination coordinates

![ScreenShot](http://dejanstojanovic.net/media/131789/route-optimized.gif)

###How to use it

```html
<html>
<head>
    <link rel="stylesheet" type="text/css" href="../src/jquery.googleroute.css" />
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script type="text/javascript" src="../src/jquery.googleroute.js"></script>
    <title></title>
</head>
<body>
    <div class="map-container"></div>
    <script type="text/javascript">
        $(document).ready(function () {
            $(".map-container").GoogleRoute({
                destinationLat: 25.1971,
                destinationLng: 55.2741,
                width: "800px",
                height: "400px"
            });
        });
    </script>
</body>
</html>
```

###Demo
Plugin in action [http://codepen.io/dejanstojanovic/full/pgyYwd/](http://codepen.io/dejanstojanovic/full/pgyYwd/)

