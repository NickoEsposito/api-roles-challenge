const roleService = require('../src/services/roleService');
const db = require('../src/data/db');
const AppError = require('../src/utils/AppError');

// Hacemos mock de la capa de persistencia
jest.mock('../src/data/db');

describe('Role Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getRoleByIdOrName', () => {
    it('debería retornar un rol por ID si existe', () => {
      const mockRole = { id: 1, name: 'admin' };
      db.getRoleById.mockReturnValue(mockRole);

      const result = roleService.getRoleByIdOrName('1');
      expect(result).toEqual(mockRole);
      expect(db.getRoleById).toHaveBeenCalledWith(1);
    });

    it('debería retornar un rol buscando por su nombre', () => {
      const mockRole = { id: 2, name: 'user' };
      db.getRoleByName.mockReturnValue(mockRole);

      const result = roleService.getRoleByIdOrName('user');
      expect(result).toEqual(mockRole);
      expect(db.getRoleByName).toHaveBeenCalledWith('user');
    });

    it('debería lanzar un AppError con status 404 si el rol no existe', () => {
      db.getRoleById.mockReturnValue(null);

      expect(() => {
        roleService.getRoleByIdOrName('99');
      }).toThrow(AppError);
      
      expect(() => {
        roleService.getRoleByIdOrName('99');
      }).toThrow('Role not found');
    });
  });
});
