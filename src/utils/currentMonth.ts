export const currentMonth = async () => {
    let arr:string[] = []
    let controlDate = new Date()

    arr.push(controlDate.toLocaleString('default', { month: 'long' }))

    controlDate.setMonth(controlDate.getMonth()-1);

    arr.push(controlDate.toLocaleString('default', { month: 'long' }))

    controlDate.setMonth(controlDate.getMonth()-1);

    arr.push(controlDate.toLocaleString('default', { month: 'long' }))

    console.log(arr.reverse());
    
    return arr
}
