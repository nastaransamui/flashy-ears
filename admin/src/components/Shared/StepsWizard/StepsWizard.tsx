import { FC, useRef, useState, useEffect } from "react";
import PropTypes from 'prop-types';

import cx from 'classnames';

import stepsWizardStyles from "./steps-wizard-style";
import { useTranslation } from "react-i18next";

import Button from '@mui/material/Button';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from "react-redux";
import { State } from "@/src/redux/store";
import useSingleData, { SingleDataCtx } from '@/hookes/useSingleData'
export interface StepsType {
  stepName: string;
  stepComponent: Function;
  stepId: string;
  isValidated: Function;
  handleChange: Function;
  values: object
}
export interface MovingTabType {
  width: number | string;
  transform: string;
  transition: string;
}

export interface StepsWizardsPropTypes {
  steps: StepsType[] | any;
  title: string;
  subtitle: string;
}

const StepsWizards: FC<StepsWizardsPropTypes> = ((props: StepsWizardsPropTypes) => {
  const { classes, theme } = stepsWizardStyles({});
  const { propsMiniActive } = useSelector<State, State>((state) => state);

  const { singleDataContext } = useSingleData();
  const wizard = useRef<any>();
  const [mainWizardWidth, setMainWizardWidth] = useState(0)

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      setMainWizardWidth(entries[0].contentRect.width)
    })
    observer.observe(wizard.current as any)
    return () => wizard.current && observer.unobserve(wizard.current)
  }, [propsMiniActive])

  const { i18n, t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const rtlActive = i18n.language == 'fa';
  const { steps, title, subtitle } = props;
  const [width, setWidth] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [movingTabStyle, setMovingTabStyle] = useState({
    transition: 'transform 0s',
  });
  const [animateCss, setAnimateCss] = useState<{ [key: number]: string }>({
    0: `animate__animated ${rtlActive ? 'animate__backInRight' : 'animate__backInLeft'}`
  })

  const [nextButton, setNextButton] = useState(steps.length > 1 ? true : false);
  const [previousButton, setPreviousButton] = useState(false);
  const [finishButton, setFinishButton] = useState(
    steps.length === 1 ? true : false
  );

  useEffect(() => {
    if (steps.length === 1) {
      setWidth('100%');
    } else {
      if (isMobile) {
        if (steps.length !== 3) {
          setWidth('50%');
        } else {
          setWidth(100 / 3 + '%');
        }
      } else {
        if (steps.length === 2) {
          setWidth('50%');
        } else {
          setWidth(100 / 3 + '%');
        }
      }
    }
    refreshAnimation(currentStep);
    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [rtlActive, steps.length, propsMiniActive, isMobile, mainWizardWidth]);

  const updateWidth = () => {
    refreshAnimation(currentStep);
  };

  const navigationStepChange = (key: number) => {

    if (steps) {
      var validationState = steps[currentStep]?.isValidated();
      if (key > currentStep) {
        for (var i = currentStep; i < key; i++) {
          // console.log([steps[i].stepId])
        }
      }
      if (validationState) {
        setPreviousButton(key > 0 ? true : false);
        setNextButton(key + 1 == steps.length ? false : true)
        setFinishButton(key + 1 == steps.length ? true : false)
        setAnimateCss({ [currentStep]: `animate__animated animate__backOutDown` })
        setTimeout(() => {
          setAnimateCss({ [key]: `animate__animated ${rtlActive ? 'animate__backInRight' : 'animate__backInLeft'}` })
          setCurrentStep(key);
        }, 300);
        steps[key].handleChange();
        refreshAnimation(key);
      }
    }
  };


  const refreshAnimation = (index: number) => {
    var total = steps.length;
    let li_width = 100 / total;
    var total_steps = steps.length;
    var move_distance = mainWizardWidth / total_steps;
    let index_temp = index;
    let vertical_level: number = 0;
    setWidth(li_width + '%');
    var step_width = move_distance;
    move_distance = rtlActive
      ? -move_distance * index_temp
      : move_distance * index_temp;
    var current = index + 1;
    if (current === 1 || (isMobile && index % 2 === 0)) {
      move_distance = rtlActive ? move_distance + 8 : move_distance - 8;
    } else if (
      current === total_steps ||
      (isMobile && index % 2 === 1)
    ) {
      move_distance = rtlActive ? move_distance - 8 : move_distance + 8;
    }
    if (isMobile) {
      vertical_level = parseInt(`${index / 2}`, 10);
      vertical_level = vertical_level * 38;
    }

    if (isMobile) {
      var movingTabStyle: MovingTabType = {
        width: step_width,
        transform:
          'translate3d(' + 0 + 'px, ' + index * 40 + 'px, 0)',
        transition: 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)',
      };
    } else {
      var movingTabStyle: MovingTabType = {
        width: steps.length == 1 ? step_width + 20 : width,
        transform: steps.length == 1 ? 'translate3d(-10px, 0px, 0)' : 'translate3d(' + move_distance + 'px, ' + vertical_level + 'px, 0)',
        transition: 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)',
      };
    }

    setMovingTabStyle(movingTabStyle);
  }


  const nextButtonClick = () => {
    var validationState = steps[currentStep]?.isValidated();
    if (validationState) {
      setPreviousButton(currentStep >= 0 ? true : false);
      setNextButton(currentStep + 2 == steps.length ? false : true)
      setFinishButton(currentStep + 2 == steps.length ? true : false)
      setAnimateCss({ [currentStep]: `animate__animated animate__backOutDown` })
      setTimeout(() => {
        setAnimateCss({ [currentStep + 1]: `animate__animated ${rtlActive ? 'animate__backInRight' : 'animate__backInLeft'}` })
        setCurrentStep(currentStep + 1);
      }, 300);
      steps[currentStep + 1].handleChange();
      refreshAnimation(currentStep + 1);
    }
  }
  const previousButtonClick = () => {
    var validationState = steps[currentStep]?.isValidated();
    if (validationState) {
      setPreviousButton(currentStep - 1 == 0 ? false : true);
      setFinishButton(currentStep < steps.length ? false : true)
      setNextButton(currentStep < steps.length ? true : false)
      setAnimateCss({ [currentStep]: `animate__animated animate__backOutDown` })
      setTimeout(() => {
        setAnimateCss({ [currentStep - 1]: `animate__animated ${rtlActive ? 'animate__backInRight' : 'animate__backInLeft'}` })
        setCurrentStep(currentStep - 1);
      }, 300);
      steps[currentStep - 1].handleChange();
      refreshAnimation(currentStep - 1);
    }
  }
  const finishButtonClick = () => { }



  return (
    <div ref={wizard}>
      <SingleDataCtx.Provider value={singleDataContext}>
        <div className={classes.card} >
          <div className={classes.wizardHeader} style={{ padding: `25px 0 ${subtitle !== '' ? 35 : 5}px`, }}>
            <h3 className={classes.title}>{title}</h3>
            <h5 className={classes.subtitle}>{subtitle}</h5>
          </div>
          <div className={classes.wizardNavigation}>
            <ul className={classes.nav}>
              {steps.map((prop: StepsType, key: number) => {
                return (
                  <li
                    className={classes.steps}
                    key={key}
                    style={{ width: width }}>
                    <a
                      href='#'
                      className={classes.stepsAnchor}
                      onClick={(e) => {
                        e.preventDefault();
                        navigationStepChange(key);
                      }}>
                      {prop.stepName}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className={classes.movingTab} style={movingTabStyle}>
              {steps[currentStep].stepName}
            </div>
          </div>

          <div
            className={cx({
              [classes.content]: true,
              [classes.bgLocation]:
                steps[currentStep]?.stepName == 'locationData',
              // []:
            })}>
            {steps.map((prop: StepsType, key: number) => {
              if (steps[currentStep].stepName == prop.stepName) {
                const stepContentClasses = cx({
                  [classes.stepContentActive]: currentStep === key,
                  [classes.stepContent]: currentStep !== key,
                });
                return (
                  <div
                    className={
                      stepContentClasses + ` ${animateCss[key]} `
                    }
                    key={key}>
                    {prop.stepComponent()}
                  </div>
                );
              }
            })}
          </div>

          <div
            className={cx({
              [classes.footer]: true,
              [classes.footerBgLocation]:
                steps[currentStep]?.stepName == 'locationData',
            })}>
            <div className={classes.left}>
              {previousButton ? (
                <Button
                  style={{ marginBottom: 10 }}
                  variant='contained'
                  size='large'
                  className={classes.previousButton}
                  onClick={() => previousButtonClick()}>
                  {t('previous', { ns: 'common' })}
                </Button>
              ) : null}
            </div>
            <div className={classes.right}>
              {nextButton ? (
                <Button
                  style={{ marginBottom: 10 }}
                  variant='contained'
                  size='large'
                  color='secondary'
                  className={classes.nextButton}
                  // type="submit"
                  onClick={() => nextButtonClick()}>
                  {t('next', { ns: 'common' })}
                </Button>
              ) : null}
              {finishButton ? (
                <Button
                  style={{ marginBottom: 10 }}
                  variant='contained'
                  size='large'
                  color='secondary'
                  className={classes.finishButton}
                  onClick={() => finishButtonClick()}>
                  {t('finish', { ns: 'common' })}
                </Button>
              ) : null}
            </div>
            <div className={classes.clearfix} />
          </div>
        </div>
      </SingleDataCtx.Provider>
    </div>
  )
})

StepsWizards.propTypes = {
  //@ts-ignore
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      stepName: PropTypes.string.isRequired,
      stepComponent: PropTypes.func.isRequired,
      stepId: PropTypes.string.isRequired,
      isValidated: PropTypes.func.isRequired,
      handleChange: PropTypes.func.isRequired,
      values: PropTypes.object.isRequired,
    }).isRequired,
  ),
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
}


export default StepsWizards;