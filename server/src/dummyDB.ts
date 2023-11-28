[
  {
    "roomName": "js",
    "title": "Async Await Example",
    "code": "async function fetchData() {\n  try {\n    const response = await fetch('https://api.example.com/data');\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Error fetching data:', error);\n    return null;\n  }\n}"
  },
  {
    "roomName": "js",
    "title": "If Else Example",
    "code": "let hour = new Date().getHours();\nif (hour < 12) {\n  console.log('Good morning!');\n} else {\n  console.log('Good afternoon!');\n}"
  },
  {
    "roomName": "js",
    "title": "Array Methods Example",
    "code": "const numbers = [1, 2, 3, 4, 5];\nconst doubledNumbers = numbers.map(num => num * 2);\nconsole.log(doubledNumbers);"
  },
  {
    "roomName": "js",
    "title": "Object Destructuring Example",
    "code": "const user = { name: 'Alice', age: 30, isAdmin: true };\nconst { name, age } = user;\nconsole.log(name, age);"
  }
]
