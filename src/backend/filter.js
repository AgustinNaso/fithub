const filterTypes = [
    {filterName:"---",
        filterActualName:undefined,
        filterValues: [],
        displayValues: []},
    {filterName:"Dificultad",
        filterActualName: "difficulty",
    filterValues: ["rookie","beginner","intermediate","advanced","expert"],
    displayValues: ["Novato","Principiante","Intermedio","Avanzado","Experto"]},
    {filterName:"Rating",
        filterActualName: "averageRating",
        filterValues: [0,1,2,3,4,5],
        displayValues: ["0 estrellas","1 estrella","2 estrellas","3 estrellas","4 estrellas","5 estrellas"]},
]

export default filterTypes