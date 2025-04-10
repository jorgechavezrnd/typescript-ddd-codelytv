import { CourseId } from '../../Shared/domain/Courses/CourseId';
import { Course } from '../domain/Course';
import { CourseDuration } from '../domain/CourseDuration';
import { CourseName } from '../domain/CourseName';
import { CourseRepository } from '../domain/CourseRepository';
import { CourseCreatorRequest } from './CourseCreatorRequest';

export class CourseCreator {
	private readonly repository: CourseRepository;

	constructor(repository: CourseRepository) {
		this.repository = repository;
	}

	async run(request: CourseCreatorRequest): Promise<void> {
		const course = new Course({
			id: new CourseId(request.id),
			name: new CourseName(request.name),
			duration: new CourseDuration(request.duration)
		});

		return this.repository.save(course);
	}
}
