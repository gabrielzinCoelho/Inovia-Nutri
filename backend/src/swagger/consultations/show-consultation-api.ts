export const ShowConsultationApiResponse = {
  status: 200,
  description: 'Consulta buscada com sucesso.',
  schema: {
    example: {
      consultation: {
        _id: '6769d0a8eab16deaf2a7ffbd',
        start_time: '2024-12-29T21:05:00.000Z',
        end_time: '2024-12-29T22:05:00.000Z',
        nutritionist: {
          _id: '6769b7004ab000bd0e461579',
          name: 'Richard Stoltenberg',
          email: 'Keenan.Bergnaum@gmail.com',
          password_hash:
            '$2a$06$C/gMtNJyqWZljNin7cxzOeN9t.fKtda09A99YkaAMAcaKtTVbDdVi',
          __v: 0,
        },
        client: {
          _id: '6769b7014ab000bd0e461585',
          name: 'Dr. Malcolm Schmidt',
          cpf: '186.109.523-23',
          email: 'Keaton57@hotmail.com',
          phone: '(89) 92295-7945',
          date_of_birth: '2001-02-01T06:33:25.082Z',
          biotype: {
            _id: '6769b7014ab000bd0e46157f',
            description: 'Ectomorfo',
            __v: 0,
          },
          __v: 0,
        },
        recurrence_interval: 7,
        recurrence_end_time: '2025-01-16T23:59:59.999Z',
        __v: 0,
      },
    },
  },
}
