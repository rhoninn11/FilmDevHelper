

import color_logo from '../assets/color.png'
import monochrome_logo from '../assets/monochrome.png'
import positive_logo from '../assets/positive.png'

import { FilmType } from '../logic/data-props'

export const estimate_logo = (filmType: FilmType) => {
    const logo_img =    filmType === FilmType.COLOR ? color_logo :
                        filmType === FilmType.MONO ? monochrome_logo :
                        positive_logo

    return logo_img
}

