export const fetchClientsApiResponse = {
  status: 200,
  description: 'Clientes listados com sucesso.',
  schema: {
    example: {
      clients: [
        {
          _id: '6761aaac9e618aa08732edb3',
          name: 'Noel Bergstrom',
          cpf: '950.760.989-49',
          email: 'Dwight91@hotmail.com',
          phone: '(11) 92739-5960',
          date_of_birth: '1973-05-16T23:29:40.074Z',
          biotype: {
            _id: '6761aaab9e618aa08732edad',
            description: 'Ectomorfo',
          },
          __v: 0,
        },
        {
          _id: '6761aaac9e618aa08732edb4',
          name: 'Shelia Lueilwitz',
          cpf: '982.543.305-52',
          email: 'Dean_Sipes42@hotmail.com',
          phone: '(27) 93707-6170',
          date_of_birth: '2002-04-23T12:56:30.460Z',
          biotype: {
            _id: '6761aaab9e618aa08732edad',
            description: 'Ectomorfo',
          },
          __v: 0,
        },
      ],
    },
  },
}
