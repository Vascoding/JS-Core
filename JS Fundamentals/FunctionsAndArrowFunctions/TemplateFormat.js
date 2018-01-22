function templateFormat(args) {
    console.log('<?xml version="1.0" encoding="UTF-8"?>')
    console.log('<quiz>')
    for (let i = 0; i < args.length; i+=2) {
        let question = args[i],
            answer = args[i+1]

        print(question, answer)
    }
    console.log('</quiz>')
    function print(question, answer) {
        console.log('  <question>')
        console.log('    ' + question)
        console.log('  </question>')
        console.log('  <answer>')
        console.log('    ' + answer)
        console.log('  </answer>')
    }
}

templateFormat(["Dry ice is a frozen form of which gas?",
    "Carbon Dioxide",
    "What is the brightest star in the night sky?",
    "Sirius"]
)