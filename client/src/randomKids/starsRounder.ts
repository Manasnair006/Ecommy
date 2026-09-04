export default function roundToHalf (num:number):string{
    return (Math.round(num*2)/2).toFixed(1)
}