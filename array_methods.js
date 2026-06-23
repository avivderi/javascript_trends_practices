2.
const word = ["hello", "world"]
word.map((item, index) => word[index] = item.toUpperCase())
console.log(word)

4.
const num = [1, 2, 3, 4, 5, 6]
const arr = num.filter(num => num % 2 === 0)
console.log(arr)

8.
const prices = [841,4,16,61,421,8,451,250,100]
const filterPrices = prices.filter(num => num > 100) .map(num => num * 1.1)
console.log(filterPrices)

10.
const duble = [1,2,3]
const reduceDuble = duble.reduce((acc, current) => acc * current, 1)
console.log(reduceDuble)

12.
const ages = [21,25,51,23,24,26,28,29,30,18]
const reduceAges = ages.reduce((acc, current) => acc + current, 0)
console.log(reduceAges / ages.length)

25.
const arr2 = [1,2,3,4,5,6]
const arrSort = arr2.sort((a,b) => b-a);
console.log(arrSort)

29.
const arr3 = [1,2,3,4,5]
arr3.splice(1,2)
console.log(arr3)

32.
const arr4 = [1,2,[3,4]]
const arrFlat = arr4.flat()
console.log(arrFlat)

36.
const chain = [1,2,3,4,5,6]
const evens = chain.filter(num => num % 2 === 0)
.map(num => num * 2)
.reduce((acc, current) => acc + current , 0)
console.log(evens)