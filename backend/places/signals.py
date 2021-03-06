"""Module for signals connected with models form places app"""
import logging

from django.db.models.signals import pre_delete
from django.dispatch import receiver

from places.models import Place
from utils import delete_std_images_from_media

LOGGER = logging.getLogger('happy_logger')


@receiver(pre_delete, sender=Place)
def delete_media_files(sender, instance, **kwargs):
    """
    Function for deleting media files of Place, before deleting instance.

    :param sender: class, instances of which we are deleting
    :param instance: object, whose files we are deleting
    :param kwargs: external parameters
    :return: None
    """
    LOGGER.info('Deleted files of place in signal.')
    delete_std_images_from_media(instance.logo,
                                 sender.VARIATIONS_LOGO)
