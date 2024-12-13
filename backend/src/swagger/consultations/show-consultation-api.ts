export const ShowConsultationstApiResponse = {
  status: 200,
  description: 'Consulta buscada com sucesso.',
  schema: {
    example: {
      consultation: {
        _id: '675cc10ac5464c094652f75f',
        start_time: '2024-12-13T20:30:00.000Z',
        end_time: '2024-12-13T21:00:00.000Z',
        nutritionist: {
          _id: '675cbf74c5464c094652f758',
          name: 'John Doe',
          email: 'johndoe@example.com',
          password_hash:
            '$2a$06$guNyRLWwS3DuWRPABkxkkOCRLBY.QOwPXBNKiet4xI.lhwwNEjR0K',
          __v: 0,
        },
        client: {
          _id: '675cbf1b6b8f36c655c2dc56',
          name: 'Victor Abshire',
          cpf: '925.318.768-84',
          email: 'Desiree_Batz24@gmail.com',
          phone: '(15) 98210-9937',
          date_of_birth: '1985-02-19T12:39:05.226Z',
          biotype: {
            _id: '675cbf1b6b8f36c655c2dc51',
            description: 'Ectomorfo',
            __v: 0,
          },
          __v: 0,
        },
        __v: 0,
      },
    },
  },
}
