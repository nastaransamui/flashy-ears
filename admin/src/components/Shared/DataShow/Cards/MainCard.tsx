import { GridSize } from '@mui/material/Grid'
import { FC, useEffect, useState, createRef, Fragment } from 'react'
import { useSelector } from 'react-redux';
import { State, MainCardTypes } from '@/src/redux/store';
import useCurrentRouteState from '@/hookes/useCurrentRouteState'
import { useReadLocalStorage } from 'usehooks-ts'

//Components
import DeleteHeader from '@/shared/DeleteHeader/DeleteHeader';
import CardDeleteBox from '@/shared/StyledComponents/CardDeleteBox';
import ClickAwayCollapse from '@/shared/CardsCompoents/ClickAwayCollapse';
import MainCardsGrid from '@/shared/CardsCompoents/MainCardsGrid';
import CardsGridView from '@/shared/CardsCompoents/CardsGridView';
import Card from '@/shared/CardsCompoents/Card';
import CardHeader from '@/shared/CardsCompoents/CardHeader'
import CardContent from '@/shared/CardsCompoents/CardContent';
import CardActions from '@/shared/CardsCompoents/CardActions';
import CardCollapseArea from '@/shared/CardsCompoents/CardCollapseArea';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';




const MainCard: FC = (() => {
  const theme = useTheme();
  const currentRouteState = useCurrentRouteState();
  const { modelName } = currentRouteState;
  const { totalData, deleteIds, statusIdsUpdate } = useSelector<State, State>(state => state)
  const gridView: GridSize = useReadLocalStorage(`${modelName}_gridView`)!
  const perPage: number = useReadLocalStorage(`${modelName}_perPage`)!
  const cardView: boolean = useReadLocalStorage(`${modelName}_cardView`)!

  const { i18n } = useTranslation();

  const [elRefs, setElRefs] = useState([]);
  useEffect(() => {
    // add  refs
    if (totalData.length !== 0) {
      setElRefs((elRefs) =>
        Array(perPage)
          .fill(0)
          .map((_, i) => elRefs[i] || createRef())
      );
    }
  }, [perPage, gridView, totalData, cardView]);

  return (
    <MainCardsGrid>
      <CardDeleteBox>
        {
          deleteIds.length !== 0 || statusIdsUpdate.length !== 0 ?
            <DeleteHeader /> : null
        }
      </CardDeleteBox>
      {totalData.length !== 0 && totalData.map((a: MainCardTypes, index) => {
        return (
          <Fragment key={a._id}>
            <CardsGridView >
              <Fragment >
                <Card ref={elRefs[index]} index={index}>
                  {
                    Object.entries(a.muiData).map(([key, value], i) => {
                      if (value.thumbnail !== '' && a.isYoutube == undefined) {
                        return (
                          <CardHeader fieldsObject={a} thumbnail={value.thumbnail} key={i} />
                        )
                      } else {
                        if (value.thumbnail !== '' && a.isYoutube && value.thumbnail !== 'videoLink') {
                          return (
                            <CardHeader fieldsObject={a} thumbnail={value.thumbnail} key={i} />
                          )
                        } else if (value.thumbnail !== '' && !a.isYoutube && value.thumbnail !== 'youTubeId') {
                          return (
                            <CardHeader fieldsObject={a} thumbnail={value.thumbnail} key={i} />
                          )
                        }
                      }
                    })
                  }
                  {
                    Object.entries(a.muiData).map(([key, value], i) => {
                      let media = value?.['thumbnail' as keyof typeof value]
                      if (value.thumbnail !== '' && a.isYoutube == undefined) {
                        if (media == 'img_light|img_dark') {
                          return (
                            <CardContent path={a[media.split("|")[theme.palette.mode == 'dark' ? 1 : 0]]} media={media} elRefs={elRefs[index]} key={i} />
                          )
                        } else if (media == 'color') {
                          return (
                            <CardContent path={a[`name_${i18n.language}`]} media={media} elRefs={elRefs[index]} key={i} colorCode={totalData[index]?.colorCode} />
                          )
                        } else {
                          return (
                            <CardContent path={a[media]} media={media} elRefs={elRefs[index]} key={i} />
                          )
                        }
                      } else {
                        if (value.thumbnail !== '' && a.isYoutube && value.thumbnail !== 'videoLink') {
                          return (
                            <CardContent isYoutube={a.isYoutube} path={a[media]} media={media} elRefs={elRefs[index]} key={i} />
                          )
                        } else if (value.thumbnail !== '' && !a.isYoutube && value.thumbnail !== 'youTubeId') {
                          return (
                            <CardContent isYoutube={a.isYoutube} path={a[media]} media={media} elRefs={elRefs[index]} key={i} />
                          )
                        }
                      }
                    })
                  }
                  <CardActions fieldObject={a} index={index} />
                  <ClickAwayCollapse index={index}>
                    <CardCollapseArea elRefs={elRefs} index={index} fieldsObject={a} />
                  </ClickAwayCollapse>
                </Card>
              </Fragment>
            </CardsGridView>
          </Fragment>
        )
      })}
    </MainCardsGrid>
  )
});


export default MainCard