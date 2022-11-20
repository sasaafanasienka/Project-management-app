import { FC, ReactElement } from 'react';
import { switchToEng, switchToRus } from '../../../redux/slices/langSlice';
import { LangOption } from '../../../redux/slices/langSlice/interfaces';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import StyledLangToggle from './StyledLangToggle';

const LangToggle: FC = (): ReactElement => {
	const currentLang = useAppSelector((state) => state.lang.currentLang);
	const dispatch = useAppDispatch();

	const onClick = currentLang === LangOption.EN
		? () => dispatch(switchToRus())
		: () => dispatch(switchToEng());

	return (
		<StyledLangToggle onClick={onClick}>
			{currentLang}
		</StyledLangToggle>
	);
};

export default LangToggle;
