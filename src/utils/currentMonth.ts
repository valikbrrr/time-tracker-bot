export const currentMonth = () => {
    let arr:string[] = []
    let controlDate = new Date()

    arr.push(controlDate.toLocaleString('default', { month: 'long' }))

    controlDate.setMonth(controlDate.getMonth()-1);

    arr.push(controlDate.toLocaleString('default', { month: 'long' }))

    controlDate.setMonth(controlDate.getMonth()-1);

    arr.push(controlDate.toLocaleString('default', { month: 'long' }))

    arr.reverse();
    
    return arr
}
