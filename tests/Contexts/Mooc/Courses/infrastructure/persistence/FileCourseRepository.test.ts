import { Course } from '../../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseDuration } from '../../../../../../src/Contexts/Mooc/Courses/domain/CourseDuration';
import { CourseName } from '../../../../../../src/Contexts/Mooc/Courses/domain/CourseName';
import { FileCourseRepository } from '../../../../../../src/Contexts/Mooc/Courses/infrastructure/persistence/FileCourseRepository';
import { CourseId } from '../../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';

describe('FileCourseRepository', () => {
	it('should save a course', async () => {
		const expectedCourse = new Course({
			id: new CourseId('ef8ac118-8d7f-49cc-abec-78e0d05af80a'),
			name: new CourseName('name'),
			duration: new CourseDuration('duration')
		});
		const repository = new FileCourseRepository();

		await repository.save(expectedCourse);

		const course = await repository.search(expectedCourse.id.value);
		expect(course).toEqual(expectedCourse);
	});
});
