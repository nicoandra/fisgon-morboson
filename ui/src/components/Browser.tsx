import { useState, useEffect } from 'react';
import { api } from '../common/api'
import Link from '@mui/material/Link';
import { Breadcrumbs, Grid, List, ListItem } from '@mui/material';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useQuery } from './../common/hooks'
import { useSearchParams} from 'react-router-dom'

const { useGetFiles } = api.queries



function getImgRemotePath(image: string) : string {
    return process.env['REACT_APP_API_SERVER']+'shots/'+image;
}

export default function Browser() {

    let [searchParams, setSearchParams] = useSearchParams();
    const locationParam = searchParams.get('location')


    function getOnClickHandler(newLocation: string) {
        return (event: { preventDefault: () => void; }) => {
            event.preventDefault();
            setSearchParams({ location: newLocation});
            setLocation(newLocation)
        }
    }

    useEffect(() => {
        null !== locationParam && setLocation(locationParam)
    }, [locationParam])

    const [ location, setLocation] = useState('.')
    const { data, isLoading, isError } = useGetFiles(location);

    if (isLoading) {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>Loading...</Grid>
            </Grid>
        )
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Breadcrumbs>
                    {data?.parentPaths.map((f) => {
                        return (

                                <Link onClick={getOnClickHandler(f.path)} >{`${f.alias}`}</Link>
                            )
                    })}
                </Breadcrumbs>
            </Grid>
            <Grid item xs={12}>
                <List>
                    {data?.subfolders.map((f) => {
                         return (<ListItem><Link onClick={getOnClickHandler(f.path)}>{`${f.alias}`}</Link></ListItem>)
                    })}
                </List>
            </Grid>
            {data?.files.filter((_, i: number) => i < 60).map((x) => {
                return (
                    <Grid item xs={2}>
                        <Card>
                            <CardMedia component="img" src={getImgRemotePath(x.path)}  />
                        </Card>
                    </Grid>
                )
            })}
            
                    
            
        </Grid>        
       )
  
}