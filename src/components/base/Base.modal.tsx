import { FC } from 'react';
import { EntityModalProps } from '../types';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { Progress } from '@nextui-org/progress';

const InventoryCell: FC = () => {
  return (
    <div className="w-16 h-16 bg-gray-700 border border-gray-600 rounded"></div>
  );
};

interface PSF {
  // fector like storege
  protein: number;
  shugar: number;
  fat: number;
}

interface BaseStr {
  psf: PSF;
  neurons: number; //this need for reserch
  bioAugmentation: []; // array of bioaugmentation
}
// atf - adinozite 3 fosfat (energy)
// Reserch: atf -> knolage points

// BurnShugar: shugar -> atf (speed 1, coficient 1)
// BurnFat: fat -> atf (speed 0.5, coficient 1)
// BurnProtein: protein -> atf (speed 0.5, coficient 0.5)

// StorageToFat: atf -> fat (speed 0.5, coficient 1)

// Create entity: atf + protein + ?fat -> entity

// Move: atf * massa -> new position
// for first time all PSF convert to ATF using specific organ but coficient  0.1 - 0.25 speed 0.25,
// Entitys
// 1. collector
// 2. basic medicant
//
//
export const BaseModal: FC<EntityModalProps> = ({ onOpenChange }) => {
  // TODO: in base i want see
  // ablity to reserch
  // ability to create new entity
  // storage for entity
  // ability to perevarivat
  return (
    <Modal isOpen={true} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Base</ModalHeader>
            <ModalBody>
              <Progress color="success" aria-label="Loading..." value={70} />
              <div className="grid grid-cols-4 gap-2 p-4 bg-gray-900 rounded-lg">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => {
                  return <InventoryCell />;
                })}
              </div>
              <p>is currently under development</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
