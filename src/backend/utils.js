


function difficultyToSpanish(difficulty){
    switch (difficulty){
        case "rookie":
            return "Novato"
        case "beginner":
            return "Principiante"
        case "intermediate":
            return "Intermedio"
        case "advanced":
            return "Avanzado"
        case "expert":
            return "Experto"
        default:
            return ""
    }
}

export {difficultyToSpanish};