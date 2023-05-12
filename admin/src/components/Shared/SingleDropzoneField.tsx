import { FC, ChangeEventHandler, useCallback, Fragment } from "react";
import { useDropzone } from 'react-dropzone'
import { ToastMessage } from '@/shared/CustomToaster/CustomToaster';
import { toast } from 'react-toastify';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import FormHelperText from "@mui/material/FormHelperText";
const SingleDropzoneField: FC<{
  name: string;
  Controller: any;
  control: any;
  t: any;
  setValue: Function;
  getValues: Function;
  classes: any;
  setValues: any;
  errors: any;
  a: string;
  values: any;
  index: number;
  setUpdateParentImage: any
}> = ({
  name,
  Controller,
  control,
  t, classes,
  setValues,
  getValues,
  setValue,
  errors,
  a,
  values,
  index,
  setUpdateParentImage,
  ...rest
}) => {


    return (
      <Controller
        rules={{ required: t('required', { ns: 'common' }) }}
        //@ts-ignore
        render={({ field: { onChange } }) => (
          <SingleDropzone
            onChange={(e: any) => { }

            }
            t={t}
            classes={classes}
            name={name}
            setValues={setValues}
            getValues={getValues}
            setValue={setValue}
            errors={errors}
            index={index}
            values={values}
            setUpdateParentImage={setUpdateParentImage}
            a={a}
            {...rest}
          />
        )}
        name={name}
        control={control}
      />
    );
  };

const SingleDropzone: FC<{
  onChange?: ChangeEventHandler<HTMLInputElement>;
  t: any;
  classes: any;
  name: any;
  setValues: any;
  setValue: Function;
  getValues: Function;
  a: string;
  errors: any;
  index: number;
  values: any;
  setUpdateParentImage: any;
}> = ({ onChange, t, classes, name, setValues, getValues, setValue, a, values, index, errors, setUpdateParentImage, ...rest }) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = function () {
        const binaryStr = reader.result
        var image = new Image();
        image.onload = function () {
          let ImageCreate: any[] = []
          ImageCreate.push({
            src: URL.createObjectURL(file),
            width: image.width,
            height: image.height,
            isSelected: false,
            tags: [
              { value: file['name'], title: file['name'] },
            ],
          })
          acceptedFiles[0].width = image.width;
          acceptedFiles[0].height = image.height;
          acceptedFiles[0].caption = a
          acceptedFiles[0].isSelected = false
          setValue(name, acceptedFiles[0])
          setUpdateParentImage(ImageCreate)
          setValues((prevState: any) => {
            if (name.includes('.')) {
              let splitNameArray = name.split('.')
              prevState[3][splitNameArray[0]][splitNameArray[1]][splitNameArray[2]][splitNameArray[3]] =
              {
                color: splitNameArray[4],
                ...ImageCreate[0]
              }
              return prevState
            } else {
              // console.log(ImageCreate)
              prevState[1][name] = ImageCreate
              return prevState
            }
          })
        };
        image.src = URL.createObjectURL(file)
      }
      reader.readAsDataURL(file);
    })

  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ...rest,
    onDrop,
    multiple: false,
    accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpeg'], 'image/jpg': ['.jpg'], },
    onDropRejected: (e) => {
      let errorText = ""
      e.map((a) => {
        errorText = a.errors[0].message
      })
      toast(<ToastMessage >{errorText}</ToastMessage>, {
        onClose: () => { }
      })
      return false
    },
    autoFocus: true,
  });

  return (
    <Fragment>
      <div {...getRootProps()} >
        <input {...getInputProps({ onChange })} />
        < >
          <p style={{ textAlign: 'center' }} >
            {/* {values[1]['colors'].filter((b: any) => b._id == a)[0]['label_en']} */}
          </p>

          <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {isDragActive ? <>{t('drop')}</> :
              <p style={{ textAlign: 'center' }} >{t('drag&drop')}</p>
            }
            {isDragActive ?
              <CloudDownloadIcon className={classes.dropIcon} /> :
              <CloudUploadIcon className={classes.uploadIcon}
              // style={{ color: values[1]['colors'].filter((b: any) => b._id == a)[0]['colorCode'] }} 
              />
            }
          </span>
          {
            name.includes('.') ?
              <>
                {errors[name.split('.')[0]] && errors?.[name.split('.')[0]]?.[name.split('.')[1]]?.[name.split('.')[2]]?.[name.split('.')[3]]?.[name.split('.')[4]]?.type === "required" &&
                  <FormHelperText error style={{ textAlign: 'center' }}>
                    {errors[name.split('.')[0]] && errors?.[name.split('.')[0]]?.[name.split('.')[1]]?.[name.split('.')[2]]?.[name.split('.')[3]]?.[name.split('.')[4]]?.[`message`]}
                  </FormHelperText>}
              </> : <>
                {errors[name] && errors?.[name]?.type === "required" &&
                  <FormHelperText error style={{ marginBottom: '15px', textAlign: 'center' }}>
                    {errors[name][`message`]}
                  </FormHelperText>}</>
          }
        </>
      </div>
    </Fragment>
  );
};

export default SingleDropzoneField;