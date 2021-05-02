// Dimension the effort
export function dynamicWindPressure (windSpeed, fatorS1, fatorS2, fatorS3){
        const characteristicWindSpeed = windSpeed * fatorS1 * fatorS2 * fatorS3;
        const Effort = 0.613 * Math.pow(characteristicWindSpeed,2) / 1000

        return Effort.toFixed(2)
}
