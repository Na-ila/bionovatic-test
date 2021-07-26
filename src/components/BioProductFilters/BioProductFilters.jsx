import React from 'react';
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form';
import {useMutation,useQueryClient, useQuery} from 'react-query';

import { Button, Divider, makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import {TableContext} from '../TableContext'
import Categories from './Categories'

const useStyles = makeStyles(theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
        margin: theme.spacing(1),
        padding: theme.spacing(2)
    },
    search: {
        width: '100%'
    },
    priceRange: {
        width: '95%'
    },
    volumeRange: {
        width: '95%'
    },
    categories: {
        alignSelf: 'flex-start'
    }
}))

function BioProductFilters(props) {
    const classes = useStyles()
    const [getState, setState] = React.useContext(TableContext)
    const {control, register, handleSubmit} = useForm()
    const [priceValue, setPriceValue] = React.useState([100, 10000]);
    const [volumeValue, setVolumeValue] = React.useState([100, 10000]);

    const queryClient = useQueryClient()

    const { isLoading, error, data } = useQuery('products', () =>
        axios('product-list')
    )

    const mutation = useMutation(axios.get('product-list'), {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries('products')
          setState({
            ...getState,
            data: getState.data,
            pages: getState.pages
          })
          //заглушка
        },
      })

    const handlePriceChange = (event, newValue, field) => {
        setPriceValue(newValue)
    };

    const handleVolumeChange = (event, newValue) => {
        setVolumeValue(newValue);
    };

    const onSubmit = (params) => {
        mutation.mutate(params)
    }

    const priceMarks = [
        {
          value: 100,
          label: '100₽',
        },
        {
          value: 10000,
          label: '10000₽',
        },
    ];

    const volumeMarks = [
        {
          value: 100,
          label: '100мл',
        },
        {
          value: 10000,
          label: '10000мл',
        },
    ];

    return (
        <Paper>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.search}>
                    <TextField
                        id="outlined-basic"
                        label="Поиск"
                        variant="outlined"
                        {...register('search_query')}
                    />
                </div>
                <Divider/>
                <div className={classes.priceRange}>
                    <Typography id="range-slider" gutterBottom>
                        Цена
                    </Typography>
                    <Controller
                        name='price_range'
                        control={control}
                        defaultValue={[100, 10000]}
                        render={({ field }) => 
                        <Slider
                            {...field} 
                            min={100}
                            max={10000}
                            value={priceValue}
                            onChange={(_, value) => {
                                field.onChange(value);
                                handlePriceChange(_, value)
                            }}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            marks={priceMarks}
                        />
                        }
                    />
                </div>
                <Divider/>
                <div className={classes.volumeRange}>
                    <Typography id="range-slider" gutterBottom>
                        Объем
                    </Typography>
                    <Controller
                        name='volume_range'
                        control={control}
                        defaultValue={[100, 10000]}
                        render={({ field }) => 
                        <Slider
                            {...field}
                            min={100}
                            max={10000}
                            value={volumeValue}
                            onChange={(_, value) => {
                                field.onChange(value);
                                handleVolumeChange(_, value)
                            }}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            marks={volumeMarks}
                            
                        />
                        }
                    />
                </div>
                <Divider/>
                <div className={classes.categories}>
                    <Controller
                        name='categories'
                        control={control}
                        defaultValue={[0]}
                        render={({ field }) => 
                        <Categories
                            field={field}
                        />
                        }
                    />
                </div>
                <Divider/>
                <Button variant='contained' color='primary' type='submit'>Найти</Button>
            </form>
        </Paper>
    );
}

export default BioProductFilters;