# Copyright (c) Microsoft Corporation
# Licensed under the MIT License.

import timeit

from responsibleai._internal.constants import SKLearn


def _is_classifier(model):
    return (model is not None and
            hasattr(model, SKLearn.PREDICT_PROBA) and
            model.predict_proba is not None)


def _measure_time(manager_compute_func):
    def compute_wrapper(*args, **kwargs):
        # print(args)
        # print(args[0])
        # import pdb
        # pdb.set_trace()
        _separator(80)
        start_time = timeit.default_timer()
        manager_compute_func(*args, **kwargs)
        elapsed = timeit.default_timer() - start_time
        m, s = divmod(elapsed, 60)
        print('Time taken: {0} min {1} sec'.format(
              m, s))
        _separator(80)
    return compute_wrapper


def _separator(max_len):
    print('=' * max_len)
