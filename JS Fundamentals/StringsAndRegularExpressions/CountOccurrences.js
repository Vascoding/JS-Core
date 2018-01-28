function countOccurrences(target, text) {
    let count = 0
    while (true){
        let occurr = text.indexOf(target)
        if (occurr > 0) {
            count++
        } else {
            break
        }
        text = text.substring(occurr + 1)
    }

    console.log(count)
}

countOccurrences('ma', 'Marine mammal training is the training and caring for marine life such as, dolphins, killer whales, sea lions, walruses, and other marine mammals. It is also a duty of the trainer to do mental and physical exercises to keep the animal healthy and happy.')