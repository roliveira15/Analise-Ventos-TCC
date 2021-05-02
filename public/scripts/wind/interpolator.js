//interpolator
// Interpolation(angle,fatorS1_3,angle_3,fatorS1_6,angle_6)

export function Interpolation (xa,y1,x1,y2,x2){
    return y1 + ((xa-x1)/(x2-x1)) * (y2-y1)
}
