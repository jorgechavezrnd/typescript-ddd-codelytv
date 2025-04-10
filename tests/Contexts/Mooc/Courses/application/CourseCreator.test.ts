import { CourseCreator } from '../../../../../src/Contexts/Mooc/Courses/application/CourseCreator';
import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseDuration } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseDuration';
import { CourseName } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseName';
import { CourseNameLengthExceeded } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseNameLengthExceeded';
import { CourseId } from '../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';
import { CourseRepositoryMock } from '../__mocks__/CourseRepositoryMock';

let repository: CourseRepositoryMock;
let creator: CourseCreator;

beforeEach(() => {
	repository = new CourseRepositoryMock();
	creator = new CourseCreator(repository);
});

describe('CourseCreator', () => {
	it('should create a valid course', async () => {
		const id = 'ef8ac118-8d7f-49cc-abec-78e0d05af80a';
		const name = 'some-name';
		const duration = 'some-duration';

		const course = new Course({
			id: new CourseId(id),
			name: new CourseName(name),
			duration: new CourseDuration(duration)
		});

		await creator.run({ id, name, duration });

		repository.assertLastSavedCourseIs(course);
	});

	it('should throw error if course name length is exceeded', async () => {
		const id = 'ef8ac118-8d7f-49cc-abec-78e0d05af80a';
		const name = 'some-name'.repeat(30);
		const duration = 'some-duration';

		expect(() => {
			const course = new Course({
				id: new CourseId(id),
				name: new CourseName(name),
				duration: new CourseDuration(duration)
			});

			creator.run({ id, name, duration });

			repository.assertLastSavedCourseIs(course);
		}).toThrow(CourseNameLengthExceeded);
	});
});
