import { inject, injectable } from 'inversify';
import { MongoDBClient, FRAMEWORK_TYPES } from 'swiss-army';
import { ServerConfig } from '../../config/server.config';
import { StudentModel } from '../../models/student.model';
import { cloudinary } from '../../util/upload.util'


/**
 * A service for the students
 */
@injectable()
export class StudentService {
    private databaseName: string;

    /**
     * Constructor
     * @param serverConfig - The server config class
     */
    constructor(
        @inject(FRAMEWORK_TYPES.ServerConfig)
        private serverConfig: ServerConfig,
    ) {
        this.databaseName = this.serverConfig.database.defaultDatabase;
    }

    public async getAllStudents() {
        const students = await StudentModel.find()

        return students;
    }

    public async getStudentById(studentId) {
        return new Promise(async (resolve, reject) => {
            try {
                const student = await StudentModel.findById(studentId);

                resolve(student);
            } catch (error) {
                reject(error)
            }
        })
    }

    public async addStudent(req) {
        return new Promise ((resolve, reject) => {
            cloudinary.uploader.upload(
                req.file.path,
                {
                    folder: 'images',
                },
                async function (error: any, result: any) {
                    if (error) {
                        console.log('Error uploading file:', error)
                        
                        reject('Something wrong in file Upload')
                    } else {
                        console.log(result)
                        Object.assign(req.body, { photo: result.url })
    
                        const data = new StudentModel({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            phone: req.body.phone,
                            profileImage: result.url,
                        })
    
                        const user = await data.save()
    
                        resolve(user);
                    }
                }
            )
        })
    } 
    
}
