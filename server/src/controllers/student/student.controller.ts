import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';
import TYPES from '../../constants/types.constants';
import { Request } from 'express';
import { ControllerResult, Status } from '../../util/controller.result.util'
import { StudentService } from '../../services/student/student.service';

/**
 * The api token controller
 */
@controller('/student')
export class StudentController {
    protected controllerName = 'student-controller';

    /**
     * Constructor
     * @param studentService - A reference to the address varification
     */
    constructor(@inject(TYPES.StudentService)
    private studentService: StudentService,
    ) {
    }

    /**
     * Get all the students
     */
    @httpGet('/get-all-students')
    public async getAllStudents() {
        try {
            const students = await this.studentService.getAllStudents();
            console.log('students --', students)
            return new ControllerResult(200, students);
        } catch (error) {
            console.log('error -> ', error)
            const response = new ControllerResult<null>(500);
            return response;
        }
    }

    /**
     * Get student by Id
     */
    @httpGet('/get-student-by-id/:id')
    public async getStudentById (reqest: Request) {
        try {
            console.log(reqest.params.id);
            const student = await this.studentService.getStudentById(reqest.params.id);
            return new ControllerResult(200, student);
        } catch (error) {
            console.log('error -> ', error)
            const response = new ControllerResult<null>(500);
            return response;
        }
    }

    /**
     * add new student
     */
    @httpPost('/')
    public async addStudent (reqest: Request) {
        try {
            console.log(reqest.body);
            const student = await this.studentService.addStudent(reqest);
            return new ControllerResult(200, student);
        } catch (error) {
            console.log('error -> ', error)
            const response = new ControllerResult<null>(500);
            return response;
        }
    }
    
}
