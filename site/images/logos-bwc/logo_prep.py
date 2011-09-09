# -*- coding: utf-8 -*-
"""
logo_prep.py

Prepare client logo images for unweb.me site

Trying to achieve the effect described here
http://www.sohtanaka.com/web-design/greyscale-hover-effect-w-css-jquery/
we'll need to create some proper images. This script automates image generation.

Tips
----
All input images must be prefixed with the same prefix (e.g. image-).
The output images will have the prefix new-.
This way you can do staff like:
 > ls
   client-1.png  client-4.png  client-6.png  client-8.png
 > python logo_prep.py client-*.png
 > ls
 client-1.png  client-4.png  client-6.png  client-8.png
 new-client-1.png  new-client-4.png  new-client-6.png new-client-8.png
"""

import Image
import glob, os, sys

def main():

    # input filenames
    input_filenames = sys.argv[1:]

    for input_file in input_filenames:
        # get color image
        color_img = Image.open(input_file)
        width, height = color_img.size

        # from RGBA to grayscale with aplha
        bw_img = color_img.convert('LA')

        # create and save final image
        final_img = Image.new('RGBA',(width, 2*height))
        final_img.paste(bw_img,(0,0))
        final_img.paste(color_img,(0,height))
        filename, ext = os.path.splitext(input_file)
        final_img.save( 'new-' + filename + '.png')

if __name__ == "__main__":
    main()
