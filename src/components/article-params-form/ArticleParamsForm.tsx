import { useRef, useState } from 'react';
import clsx from 'clsx';

import {
	fontFamilyOptions,
	defaultArticleState,
	ArticleStateType,
	OptionType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleToggle = () => {
		setIsSidebarOpen((prevState) => !prevState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(formState);
		setIsSidebarOpen(false);
	};

	const formContainerRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isSidebarOpen,
		rootRef: formContainerRef,
		onChange: setIsSidebarOpen,
	});

	const handleFormChange =
		(field: keyof ArticleStateType) => (selected: OptionType) => {
			setFormState((prevState) => ({
				...prevState,
				[field]: selected,
			}));
		};

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={handleToggle} />
			<div ref={formContainerRef}>
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isSidebarOpen,
					})}>
					<form
						className={styles.form}
						onSubmit={handleSubmit}
						onReset={handleReset}>
						<Text as='h2' size={31} weight={800} uppercase>
							Задайте параметры{' '}
						</Text>

						<Select
							title='Шрифт'
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={handleFormChange('fontFamilyOption')}
						/>

						<RadioGroup
							name='font-size'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={handleFormChange('fontSizeOption')}
						/>

						<Select
							title='Цвет шрифта'
							selected={formState.fontColor}
							options={fontColors}
							onChange={handleFormChange('fontColor')}
						/>

						<div className={styles.separator} />

						<Select
							title='Цвет фона'
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={handleFormChange('backgroundColor')}
						/>

						<Select
							title='Ширина контента'
							selected={formState.contentWidth}
							options={contentWidthArr}
							onChange={handleFormChange('contentWidth')}
						/>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' htmlType='reset' type='clear' />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
