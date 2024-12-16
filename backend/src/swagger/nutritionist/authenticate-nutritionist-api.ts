export const authenticateNutritionistApiResponse = {
  status: 200,
  description: 'Nutricionista autenticado com sucesso.',
  schema: {
    example: {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzViMmVmMWI0YTVmODY4ZWIzMWIzMTUiLCJpYXQiOjE3MzQwMzUyNDEsImV4cCI6MTczNDAzODg0MX0.meUpdCLSyYFVLCiVLGMJd5zZ9_oPGhokQIobpLc9tek',
    },
  },
}

export const validateNutritionistTokenApiResponse = {
  status: 200,
  description: 'O token informado é válido.',
  schema: {
    example: {
      statusToken: 'valid',
    },
  },
}
