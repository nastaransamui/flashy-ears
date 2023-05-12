import { FC } from "react";
import { SketchPicker, } from 'react-color'
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import createColorHook from './createColorHook'

export interface ColorFormTypes {
  t: Function;
  watch: any;
  errors: any;
  register: any;
  setError: any;
  clearErrors: any;
  colorSelected: string;
  showSelect: boolean;
  handleColorChange: Function;
  setShowSelect: Function;
  classes: any
}

const ColorForm: FC<ColorFormTypes> = ((props: ColorFormTypes) => {
  const {
    errors,
    setError,
    clearErrors,
    register,
    watch,
    colorSelected,
    classes,
    showSelect,
    setShowSelect,
    handleColorChange,
    t,
  } = props;

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3} >
          <TextField
            variant='outlined'
            fullWidth
            required
            size='small'
            label={t('label_en')}
            InputLabelProps={{ shrink: !!watch('label_en') }}
            error={errors.label_en == undefined ? false : true}
            helperText={errors.label_en && errors['label_en'][`message`]}
            {...register("label_en", { required: t('required', { ns: 'common' }) })}
          />
        </Grid>
        <Grid item xs={12} md={3} >
          <TextField
            variant='outlined'
            fullWidth
            required
            size='small'
            label={t('label_th')}
            InputLabelProps={{ shrink: !!watch('label_th') }}
            error={errors.label_th == undefined ? false : true}
            helperText={errors.label_th && errors['label_th'][`message`]}
            {...register("label_th", { required: t('required', { ns: 'common' }) })}
          />
        </Grid>
        <Grid item xs={12} md={3} >
          <TextField
            variant='outlined'
            fullWidth
            required
            size='small'
            label={t('name_en')}
            onKeyPress={(e) => {
              var inputValue = e.which;
              if (!(inputValue >= 97 && inputValue <= 122)) {
                e.preventDefault();
                setError(`name_en`, { type: 'custom', message: t('onlyAlphabet') });
              } else {
                clearErrors('name_en')
              }
            }}
            onPaste={(e) => {
              var pat = /^[a-z]+$/;
              if (!pat.test(e.clipboardData.getData('Text'))) {
                e.preventDefault();
                setError(`name_en`, { type: 'numer', message: t('onlyAlphabet') });
              }
            }
            }
            InputLabelProps={{ shrink: !!watch('name_en') }}
            helperText={errors.name_en && errors['name_en'][`message`]}
            {...register("name_en", { required: t('required', { ns: 'common' }) })}
            error={errors.name_en == undefined ? false : true}
          />
        </Grid>
        <Grid item xs={12} md={3} >
          <TextField
            variant='outlined'
            fullWidth
            required
            size='small'
            label={t('name_th')}
            onKeyPress={(e) => {
              var inputValue = e.which;
              if (!(inputValue >= 97 && inputValue <= 122)) {
                e.preventDefault();
                setError(`name_th`, { type: 'custom', message: t('onlyAlphabet') });
              } else {
                clearErrors('name_th')
              }
            }}
            InputLabelProps={{ shrink: !!watch('name_th') }}
            helperText={errors.name_th && errors['name_th'][`message`]}
            {...register("name_th", { required: t('required', { ns: 'common' }) })}
            error={errors.name_th == undefined ? false : true}

          />
        </Grid>
        <Grid item xs={12} md={6} >
          <TextField
            variant='outlined'
            fullWidth
            required
            size='small'
            disabled
            value={colorSelected}
            label={t('colorCode')}
            // InputLabelProps={{ shrink: true }}
            error={errors.colorCode == undefined ? false : true}
            helperText={errors.colorCode && t('required', { ns: 'common' })}
            {...register("colorCode", {
              required: true,
            })}
          />
        </Grid>
        <Grid item xs={12} md={6} >
          <ClickAwayListener onClickAway={() => { setShowSelect(() => false) }}>
            <div className={classes.colorDiv} onClick={() => { setShowSelect(() => true) }}>
              <p className={classes.colorP}>{t('selectColor')}</p>
              {showSelect && <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginTop: 15,
                  zIndex: 2
                }}
              >
                <SketchPicker
                  color={colorSelected}
                  onChangeComplete={handleColorChange}
                />
              </div>}
            </div>
          </ClickAwayListener>
        </Grid>
      </Grid>
    </div>
  )
})

export default ColorForm