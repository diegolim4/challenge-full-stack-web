import { Prisma } from '@prisma/client';

export class PrismaErrorHandler {
  static parse(error: any): { statusCode: number; message: string } {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2000':
          return {
            statusCode: 400,
            message:
              'The provided value for the column is too long for the column type.',
          };
        case 'P2001':
          return {
            statusCode: 404,
            message:
              'The record searched for in the where condition does not exist.',
          };
        case 'P2002':
          return {
            statusCode: 409,
            message:
              'Unique constraint failed on the field(s). Data already exists.',
          };
        case 'P2003':
          return {
            statusCode: 400,
            message:
              'Foreign key violation: Record is linked to related data.',
          };
        case 'P2004':
          return {
            statusCode: 400,
            message: 'A constraint in the database was violated.',
          };
        case 'P2005':
          return {
            statusCode: 400,
            message:
              'The value stored in the database is invalid for the column type.',
          };
        case 'P2006':
          return {
            statusCode: 400,
            message: 'The provided value is not valid for the field.',
          };
        case 'P2007':
          return {
            statusCode: 400,
            message: 'Data validation error.',
          };
        case 'P2008':
          return {
            statusCode: 400,
            message: 'Failed to parse the query.',
          };
        case 'P2009':
          return {
            statusCode: 400,
            message: 'Query validation error.',
          };
        case 'P2010':
          return {
            statusCode: 400,
            message: 'Raw query failed.',
          };
        case 'P2011':
          return {
            statusCode: 400,
            message: 'Null constraint violation on the field(s).',
          };
        case 'P2012':
          return {
            statusCode: 400,
            message: 'Missing a required value.',
          };
        case 'P2013':
          return {
            statusCode: 400,
            message: 'Missing the required argument.',
          };
        case 'P2014':
          return {
            statusCode: 400,
            message:
              'The change you are trying to make would violate a required relation.',
          };
        case 'P2015':
          return {
            statusCode: 404,
            message: 'A related record could not be found.',
          };
        case 'P2016':
          return {
            statusCode: 400,
            message: 'Query interpretation error.',
          };
        case 'P2017':
          return {
            statusCode: 400,
            message: 'The records for the relation are not connected.',
          };
        case 'P2018':
          return {
            statusCode: 404,
            message: 'The required connected records were not found.',
          };
        case 'P2019':
          return {
            statusCode: 400,
            message: 'Input error.',
          };
        case 'P2020':
          return {
            statusCode: 400,
            message: 'Value out of range for the column type.',
          };
        case 'P2021':
          return {
            statusCode: 500,
            message: 'The table does not exist in the database.',
          };
        case 'P2022':
          return {
            statusCode: 500,
            message: 'The column does not exist in the database.',
          };
        case 'P2023':
          return {
            statusCode: 400,
            message: 'Inconsistent data returned from the database.',
          };
        case 'P2024':
          return {
            statusCode: 503,
            message: 'Timed out fetching a new connection from the pool.',
          };
        case 'P2025':
          return {
            statusCode: 404,
            message:
              'Not found: Record required for the operation does not exist.',
          };
        case 'P2026':
          return {
            statusCode: 500,
            message:
              'The current database provider does not support this feature.',
          };
        case 'P2027':
          return {
            statusCode: 500,
            message:
              'Multiple errors occurred on the database during query execution.',
          };
        case 'P2028':
          return {
            statusCode: 500,
            message: 'Transaction API error.',
          };
        case 'P2030':
          return {
            statusCode: 400,
            message: 'Cannot find a fulltext index to use for the search.',
          };
        case 'P2031':
          return {
            statusCode: 500,
            message: 'MongoDB replica set is required for this operation.',
          };
        case 'P2033':
          return {
            statusCode: 400,
            message: 'Number too large for the database.',
          };
        case 'P2034':
          return {
            statusCode: 409,
            message: 'Transaction failed due to a write conflict or deadlock.',
          };
        case 'P2035':
          return {
            statusCode: 400,
            message: 'Database validation error.',
          };
        case 'P2036':
          return {
            statusCode: 500,
            message: 'Error in external connector.',
          };
        case 'P2037':
          return {
            statusCode: 413,
            message: 'Too many results returned by the database.',
          };

        case 'P1000':
          return {
            statusCode: 401,
            message: 'Authentication failed against database server.',
          };
        case 'P1001':
          return {
            statusCode: 503,
            message: 'Database server could not be reached.',
          };
        case 'P1002':
          return {
            statusCode: 503,
            message: 'Database server connection timed out.',
          };
        case 'P1003':
          return {
            statusCode: 500,
            message: 'Database does not exist.',
          };
        case 'P1004':
          return {
            statusCode: 500,
            message: 'Database file not found.',
          };
        case 'P1008':
          return {
            statusCode: 503,
            message: 'Operations timed out.',
          };
        case 'P1009':
          return {
            statusCode: 500,
            message: 'Database already exists.',
          };
        case 'P1010':
          return {
            statusCode: 403,
            message: 'User does not have permission to perform this action.',
          };
        case 'P1011':
          return {
            statusCode: 500,
            message: 'Error opening a TLS connection.',
          };
        case 'P1012':
          return {
            statusCode: 500,
            message: 'Schema validation error.',
          };
        case 'P1013':
          return {
            statusCode: 400,
            message: 'Invalid database connection string.',
          };
        case 'P1014':
          return {
            statusCode: 500,
            message: 'The model does not exist.',
          };
        case 'P1015':
          return {
            statusCode: 500,
            message: 'Prisma schema version is outdated or not supported.',
          };
        case 'P1016':
          return {
            statusCode: 400,
            message: 'Incorrect number of parameters in the raw query.',
          };
        case 'P1017':
          return {
            statusCode: 503,
            message: 'Database server has closed the connection.',
          };

        default:
          return {
            statusCode: 400,
            message: `Unknown Prisma error: ${error.code} - ${error.message}`,
          };
      }
    }

    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      return {
        statusCode: 500,
        message: `Unknown database error: ${error.message}`,
      };
    }

    if (error instanceof Prisma.PrismaClientRustPanicError) {
      return {
        statusCode: 500,
        message: 'Critical Prisma engine error occurred.',
      };
    }

    if (error instanceof Prisma.PrismaClientInitializationError) {
      return {
        statusCode: 500,
        message: 'Failed to initialize Prisma Client.',
      };
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
      return {
        statusCode: 400,
        message: 'Query validation failed.',
      };
    }

    return {
      statusCode: 500,
      message: 'Internal server error.',
    };
  }
}
