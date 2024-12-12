export const createNutritionistApiResponse = {
  status: 201,
  description: 'Nutricionista criado com sucesso.',
  schema: {
    example: {
      nutritionist: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password_hash:
          '$2a$06$D.CjZ0W9GlM9fmPUJcDvQ.7WAorPU8bPD8Nbqxf3OJcGlQ2LALSCy',
        _id: '675b2ef1b4a5f868eb31b315',
        __v: 0,
      },
    },
  },
}
