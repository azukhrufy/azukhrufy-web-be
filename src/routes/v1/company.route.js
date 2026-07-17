const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const companyValidation = require('../../validations/company.validation');
const projectValidation = require('../../validations/project.validation');
const companyController = require('../../controllers/company.controller');
const projectController = require('../../controllers/project.controller');

const router = express.Router();

// Public routes - no auth middleware
router.route('/').get(validate(companyValidation.getCompanies), companyController.getCompanies);
router.route('/:companyId').get(validate(companyValidation.getCompany), companyController.getCompany);

// Nested: list projects for a company (also public)
router.route('/:companyId/projects').get(validate(projectValidation.getProjects), projectController.getProjects);

// AUTH required routes
router.route('/').post(auth('manageCompanies'), validate(companyValidation.createCompany), companyController.createCompany);

router
  .route('/:companyId')
  .patch(auth('manageCompanies'), validate(companyValidation.updateCompany), companyController.updateCompany)
  .delete(auth('manageCompanies'), validate(companyValidation.deleteCompany), companyController.deleteCompany);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Company management and retrieval
 */

/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Create a company
 *     description: Only logged in users can create companies.
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *             example:
 *               name: Acme Corp
 *               role: client
 *               description: A leading manufacturer
 *               startDate: 2024-01-01
 *               endDate: 2024-12-31
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all companies
 *     description: Public - anyone can retrieve companies.
 *     tags: [Companies]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Company name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Company role
 *       - in: query
 *         name: withProjects
 *         schema:
 *           type: boolean
 *         description: Populate projects (default false)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of companies
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Company'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 */

/**
 * @swagger
 * /companies/{companyId}:
 *   get:
 *     summary: Get a company
 *     description: Public - anyone can retrieve a company.
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: string
 *         description: Company id
 *       - in: query
 *         name: withProjects
 *         schema:
 *           type: boolean
 *         description: Populate projects (default false)
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a company
 *     description: Only logged in users can update companies.
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: string
 *         description: Company id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *             example:
 *               name: Acme Corp
 *               role: client
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a company
 *     description: Only logged in users can delete companies.
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: string
 *         description: Company id
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /companies/{companyId}/projects:
 *   get:
 *     summary: Get projects for a company
 *     description: Public - anyone can retrieve projects for a company.
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: string
 *         description: Company id
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Project name
 *       - in: query
 *         name: withCompany
 *         schema:
 *           type: boolean
 *         description: Populate company data (default false)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 */
