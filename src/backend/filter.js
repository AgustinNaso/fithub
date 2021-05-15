const filterTypes = [
    {filterName:"---",
        filterActualName:undefined,
        filterValues: [],
        displayValues: []},
    {filterName:"Puntuación",
        filterActualName: "averageRating",
        filterValues: [1,2,3,4,5],
        displayValues: ["1 Estrella","2 Estrellas","3 Estrellas","4 Estrellas","5 Estrellas"]},
    {filterName:"Dificultad",
        filterActualName: "difficulty",
    filterValues: ["rookie","beginner","intermediate","advanced","expert"],
    displayValues: ["Novato","Principiante","Intermedio","Avanzado","Experto"]},
]

export default filterTypes