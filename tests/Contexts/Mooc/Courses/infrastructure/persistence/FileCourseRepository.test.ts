import { Course } from '../../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { FileCourseRepository } from '../../../../../../src/Contexts/Mooc/Courses/infrastructure/persistence/FileCourseRepository';
import { Uuid } from '../../../../../../src/Contexts/Shared/domain/value-object/Uuid';

describe('FileCourseRepository', () => {
	it('should save a course', async () => {
		const expectedCourse = new Course({
			id: new Uuid('ef8ac118-8d7f-49cc-abec-78e0d05af80a'),
			name: 'name',
			duration: 'duration'
		});
		const repository = new FileCourseRepository();

		await repository.save(expectedCourse);

		const course = await repository.search(expectedCourse.id.value);
		expect(course).toEqual(expectedCourse);
	});
});
