function capture(arr) {
    let regex = /\d+/g
    let numbers = []
    for (let num of arr){
        let nums = num.match(regex)
        if (nums) {
            for (let i = 0; i < nums.length; i++) {
                numbers.push(nums[i])
            }
        }

    }
    console.log(numbers.join(' '))
}

capture(['T32he300',
'What is that?',
'I think it’s the 3rd movie.',
'Lets watch it at 22:45'])