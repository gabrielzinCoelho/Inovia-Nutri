export const UpdateConsultationApiResponse = {
  status: 200,
  description: 'Consulta atualizada com sucesso.',
  schema: {
    example: {
      consultation: {
        _id: '675cc181c5464c094652f77b',
        start_time: '2024-12-13T22:12:00.000Z',
        end_time: '2024-12-13T22:22:00.000Z',
        nutritionist: {
          _id: '675cbf74c5464c094652f758',
          name: 'John Doe',
          email: 'johndoe@example.com',
          password_hash:
            '$2a$06$guNyRLWwS3DuWRPABkxkkOCRLBY.QOwPXBNKiet4xI.lhwwNEjR0K',
          __v: 0,
        },
        client: {
          _id: '675cbf1b6b8f36c655c2dc57',
          name: 'Bertha Orn',
          cpf: '567.292.299-75',
          email: 'Orin27@hotmail.com',
          phone: '(96) 94591-2356',
          date_of_birth: '2000-11-05T15:35:07.396Z',
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
