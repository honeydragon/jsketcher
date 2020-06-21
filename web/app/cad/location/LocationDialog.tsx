import React, {useCallback, useContext} from 'react';
import {useStreamWithUpdater} from "ui/effects";
import {AppContext} from "../dom/components/AppContext";
import {GenericWizard} from "ui/components/GenericWizard";
import Field from "ui/components/controls/Field";
import {Group} from "../craft/wizard/components/form/Form";
import Label from "ui/components/controls/Label";
import Folder from "ui/components/Folder";
import {never} from "lstream";
import NumberControl from "ui/components/controls/NumberControl";
import {Location} from "../model/location";
import {DEG_RAD} from "../../math/math";
import CSys from "math/csys";

export function LocationDialog() {

  const [req, setReq] = useStreamWithUpdater(ctx => ctx.locationService.editLocationRequest$);


  const [location, setLocation] = useStreamWithUpdater(() => req ? req.shell.location$ : never<CSys>());

  const setX = useCallback(x => {
    location.origin.x = parseFloat(x);
    setLocation(location);
  }, [setLocation]);

  const setY = useCallback(y => {
    location.origin.y = parseFloat(y);
    setLocation(location);
  }, [setLocation]);

  const setZ = useCallback(z => {
    location.origin.z = parseFloat(z);
    setLocation(location);
  }, [setLocation]);
  //
  // const setAzimuth = useCallback(angle => {
  //   location.rotationAxisAzimuth = parseFloat(angle) * DEG_RAD;
  //   setLocation(location);
  // }, [setLocation]);
  //
  // const setInclination = useCallback(angle => {
  //   location.rotationAxisInclination = parseFloat(angle) * DEG_RAD;
  //   setLocation(location);
  // }, [setLocation]);
  //
  // const setAngle = useCallback(angle => {
  //   location.rotationAxisAngle = parseFloat(angle) * DEG_RAD;
  //   setLocation(location);
  // }, [setLocation]);

  const ctx = useContext(AppContext);

  if (!req) {
    return null;
  }

  const revert = () => {
    // close();
  };

  const close = () => {
    setReq(null);
  };

  const revertAndClose = () => {
    close();
  };

  return <GenericWizard
    left={15}
    title='PART LOCATION'
    onClose={close}
    className='location-dialog'
    topicId='entity-location'
    infoText={null}
    onCancel={revertAndClose}
    onOK={close} >

    <Folder title='Position'>
      <Group>
        <Field active={false} name='X'>
          <Label>X:</Label>
          <NumberControl onChange={setX} value={location.origin.x} />
        </Field>
        <Field active={false} name='Y'>
          <Label>Y:</Label>
          <NumberControl onChange={setY} value={location.origin.y} />
        </Field>
        <Field active={false} name='Z'>
          <Label>Z:</Label>
          <NumberControl onChange={setZ} value={location.origin.z} />
        </Field>
      </Group>
    </Folder>
    <Folder title='Rotation'>
      <Group>
        {/*<Field active={false} name='Azimuth'>*/}
        {/*  <Label>Axis Azimuth:</Label>*/}
        {/*  <NumberControl onChange={setAzimuth} value={location.rotationAxisAzimuth / DEG_RAD} />*/}
        {/*</Field>*/}
        {/*<Field active={false} name='Inclination'>*/}
        {/*  <Label>Axis Inclination:</Label>*/}
        {/*  <NumberControl onChange={setInclination} value={location.rotationAxisInclination / DEG_RAD} />*/}
        {/*</Field>*/}
        {/*<Field active={false} name='Angle'>*/}
        {/*  <Label>Angle:</Label>*/}
        {/*  <NumberControl onChange={setAngle} value={location.rotationAxisAngle / DEG_RAD} />*/}
        {/*</Field>*/}
      </Group>
    </Folder>


  </GenericWizard>

}