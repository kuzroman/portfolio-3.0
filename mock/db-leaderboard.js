module.exports = () => {

  const arr1 = [
    { 'user': 'Trololo', 'score': 1000 },
    {
      'user': 'Pistoletos Msdfadfadgadgdsgfsdfg Msdfadfadgadgdsgfsdfg',
      'score': 10000
    },
    { 'user': 'P', 'score': 100 }
  ]

  const arr2 =
    Array.from(Array(100), (v, k) => ({
      user: 'User_' + k,
      score: Math.ceil(Math.random() * 10000)
    }))

  return { leaderBoards: [...arr1, ...arr2] }
}