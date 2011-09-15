/**
 * This jQuery Plugin is meant to replace image tags with canvas renderings.
 */
(function($){  
    function drawReflection(context, image, imgWidth, imgHeight, reflectionHeight, startOpacity){
        context.drawImage(image, 0, 0, imgWidth, imgHeight);
        
        var reflection = context.getImageData(0, imgHeight, imgWidth, reflectionHeight);
        
        for(var y = 0; y < reflectionHeight; y++){
            for(var x = 0; x < image.width; x++){
                reflection.data[(x+y*image.width)*4 + 3] = startOpacity - ((y*1.0) / reflectionHeight)*startOpacity;
            }
        }
        
        context.putImageData(reflection, 0, image.height);
    }
    
    function reflectIt(node, startOpacity, reflectionScale){
        // do the work here.
        var answer = $(this);
        if(this.tagName.toLowerCase() == "img"){
            var canvas = document.createElement("canvas");
            $(canvas).attr("title", $(node).attr("title")).attr("alt", $(node).attr("alt"));
            
            function reflectBind(){
                var $node = $(node);
                var width = $node.attr('width');
                var height = $node.attr('height');
                canvas.width = width;
                canvas.height = height * (1 + reflectionScale);
                
                var context = canvas.getContext("2d");
                
                context.drawImage(node,0,0, width, height);
                context.save();
                    context.translate(0, 2*height);
                    context.save();
                        context.transform(1,0,0,-1,0,0);
                        drawReflection(context, this, width, height, canvas.height - height, startOpacity);
                    context.restore();
                context.restore();
                $(canvas).replaceAll(node).append(node);
                $(this).unbind(reflectBind);
            }
            
            if(!this.complete){
                console.log("binding");
                $(this).bind("onload",reflectBind);
            } else {
                reflectBind.apply(this);
            }
            
            answer = canvas;
        }
        return answer;
    }
    
    $.fn.reflect = function(options){
        var settings = jQuery.extend({
            startOpacity: 0.6,
            reflectionScale: 0.5
        }, options);
        
        /*
         * if the browser does not support canvas, just return.
         */
        var testCanvas = document.createElement("canvas");
        if(!testCanvas.getContext){
            return this;
        }
        
        for(var i = 0; i < this.length; i++){
            var img = this[i];
            this[i] = reflectIt.apply(img, [img, settings.startOpacity*255 > 255 ? 255 : settings.startOpacity * 255, settings.reflectionScale]);
        } 
        return this;
    }
})(jQuery);