import React from 'react';
//Material UI core
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
//Material UI icons
import FaceIcon from '@material-ui/icons/Face';
import WcIcon from '@material-ui/icons/Wc';
import TodayIcon from '@material-ui/icons/Today';
import SchoolIcon from '@material-ui/icons/School';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';

export default function ProfileAbout() {
    return (
        <List style={{ maxWidth: 520, margin: '0 auto' }}>
            <ListItem dense>
                <ListItemText
                    primary='Details'
                    primaryTypographyProps={{ color: 'secondary', variant: 'subtitle1' }} />
            </ListItem>
            <ListItem dense disabled>
                <ListItemIcon><FaceIcon /></ListItemIcon>
                <ListItemText primary='Name' />
            </ListItem>
            <ListItem>
                <ListItemText inset primary='Anisuzzaman Shayak' />
            </ListItem>
            <ListItem dense disabled>
                <ListItemIcon><TodayIcon /></ListItemIcon>
                <ListItemText primary='Birthday' />
            </ListItem>
            <ListItem>
                <ListItemText inset primary='24th October 1998' />
            </ListItem>
            <ListItem dense disabled>
                <ListItemIcon><WcIcon /></ListItemIcon>
                <ListItemText primary='Gender' />
            </ListItem>
            <ListItem divider>
                <ListItemText inset primary='Male' />
            </ListItem>
            <ListItem dense >
                <ListItemText
                    primary='Education'
                    primaryTypographyProps={{ color: 'secondary', variant: 'subtitle1' }} />
            </ListItem>
            <ListItem dense disabled>
                <ListItemIcon><SchoolIcon /></ListItemIcon>
                <ListItemText primary='School' />
            </ListItem>
            <ListItem >
                <ListItemText inset primary='Bhaluka Pilot Hugh School' secondary='2011-2014' />
            </ListItem>
            <ListItem dense disabled>
                <ListItemIcon><SchoolIcon /></ListItemIcon>
                <ListItemText primary='College' />
            </ListItem>
            <ListItem >
                <ListItemText inset primary='Cantonment Public School and College, Mymensingh' secondary='2014-2016' />
            </ListItem>
            <ListItem dense disabled>
                <ListItemIcon><SchoolIcon /></ListItemIcon>
                <ListItemText primary='University' />
            </ListItem>
            <ListItem divider>
                <ListItemText inset primary='Daffodil International University' secondary='2018-2021' />
            </ListItem>
            <ListItem dense>
                <ListItemText
                    primary='Contacts'
                    primaryTypographyProps={{ color: 'secondary', variant: 'subtitle1' }} />
            </ListItem>
            <ListItem dense disabled>
                <ListItemIcon><PhoneIcon /></ListItemIcon>
                <ListItemText primary='Phone' />
            </ListItem>
            <ListItem>
                <ListItemText inset primary='+880 1983-180596' />
            </ListItem>
            <ListItem dense disabled>
                <ListItemIcon><EmailIcon /></ListItemIcon>
                <ListItemText primary='Email' />
            </ListItem>
            <ListItem>
                <ListItemText inset primary='shayakanis@gmail.com' />
            </ListItem>
            <ListItem dense disabled>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary='Address' />
            </ListItem>
            <ListItem>
                <ListItemText inset primary='DIU Permanent Campus, Ashulia, Savar, Dhaka' />
            </ListItem>
        </List>
    )
}