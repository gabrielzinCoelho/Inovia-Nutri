export const CreateConsultationApiResponse = {
  status: 201,
  description: 'Consulta criada com sucesso.',
  schema: {
    example: {
      consultation: {
        start_time: '2024-12-13T22:20:00.000Z',
        end_time: '2024-12-13T22:30:00.000Z',
        nutritionist: {
          _id: '675cbf1b6b8f36c655c2dc4f',
          name: 'Adrienne Lockman',
          email: 'Destiney_Volkman65@yahoo.com',
          password_hash:
            '$2a$06$tCY/7OpWCqYY5extE3SM7./IIuEEYDn9DH1ITdan917vavCkqa.1a',
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
        _id: '675cc6cd9bd43c53b02984cd',
        __v: 0,
      },
    },
  },
}
