<script>
import noop from '../../utils/noop';
import getElementOffsets from '../../utils/getElementOffsets';
import emptyArray from '../../utils/emptyArray';
import './custom-select.scss';

export default {
  name: 'CustomSelect',
  props: {
    name: String,
    onChange: { type: Function, default: noop },
    selectedOptionId: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    options: { type: Array, default: emptyArray }
  },
  data() {
    return {
      optionsListElement: null,
      initIndexOfSelectedOption: this.selectedOptionId ? 0 : undefined,
      indexOfSelectedOption: this.selectedOptionId ? 0 : undefined,
      optionsListLength: this.options.length,
      triggerSelect: null,
      isOpen: false,
      selectedOption: this.selectedOptionId ? this.options[0] || { id: '', title: '...' } : {}
    };
  },
  methods: {
    scrollList(listElement) {
      if (listElement && listElement.children && listElement.children.length) {
        const optionHeght = listElement.children[0].offsetHeight;
        const midElement = (listElement.offsetHeight / optionHeght) / 2;
        listElement.scrollTop = (this.indexOfSelectedOption - midElement) * optionHeght;
      }
    },
    getOptionsLisHeight(optionsLisTopOffset) {
      if ((window.innerHeight - optionsLisTopOffset - this.optionsListElement.offsetHeight) <= 0) {
        return `${window.innerHeight - optionsLisTopOffset - 5}px`;
      }

      return 'auto';
    },
    getTopOffsetByPlacement(triggerOffsets, placement) {
      if (placement === 'top') {
        return triggerOffsets.top - this.optionsListElement.offsetHeight;
      }

      return triggerOffsets.top + this.triggerSelect.offsetHeight; // placement === 'bottom'
    },
    getBestFitPlacement(triggerOffsets) {
      const top = (triggerOffsets.top - this.optionsListElement.offsetHeight) >= 0;

      return top ? 'top' : 'bottom';
    },
    observe() {
      if (this.isOpen) {
        this.triggerSelect = this.$refs.triggerSelect;
        this.optionsListElement = this.$refs.optionsListElement;
        const triggerOffsets = getElementOffsets(this.triggerSelect);

        this.scrollList(this.optionsListElement);
        const optionsLisTopOffset = this.getTopOffsetByPlacement(triggerOffsets, this.getBestFitPlacement(triggerOffsets));

        this.optionsListElement.style.top = `${optionsLisTopOffset}px`;
        this.optionsListElement.style.left = `${triggerOffsets.left}px`;
        this.optionsListElement.style.minWidth = `${this.triggerSelect.offsetWidth}px`;
        this.optionsListElement.style.height = this.getOptionsLisHeight(optionsLisTopOffset);
      }
    },
    setSelectedOption(selectedOptionId) {
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].id === selectedOptionId) {
          this.selectedOption = this.options[i];
          this.indexOfSelectedOption = i;
          this.initIndexOfSelectedOption = i;
        }
      }
    },
    onOptionClick(event) {
      if (this.selectedOptionId) {
        this.setSelectedOption(event.target.dataset.id);
      }

      this.onChange(this.selectedOption, this.name);
      this.isOpen = false;
    },
    onUpDown(event) {
      // up
      if (!this.readonly && !this.disabled && !!this.indexOfSelectedOption && event.keyCode === 38) {
        this.indexOfSelectedOption--;
        this.setOptionByUpDownButtons(!this.isOpen);
      }
      // down
      if (!this.readonly && !this.disabled && (this.indexOfSelectedOption !== this.optionsListLength - 1) && (event.keyCode === 40)) {
        this.indexOfSelectedOption++;
        this.setOptionByUpDownButtons(!this.isOpen);
      }
    },
    setOptionByUpDownButtons(isAllowedToSet) {
      if (isAllowedToSet) {
        this.initIndexOfSelectedOption = this.indexOfSelectedOption;
        this.selectedOption = this.options[this.indexOfSelectedOption];
        this.onChange(this.selectedOption, this.name);
      }
    },
    onWindowResizeCloseSelectList() {
      if (this.isOpen) {
        this.isOpen = false;
        this.indexOfSelectedOption = this.initIndexOfSelectedOption;
      }
    },
    onDocumentEventCloseSelectList(event) {
      if (!this.triggerSelect.contains(event.target)) {
        this.onWindowResizeCloseSelectList();
      }
    },
    onEnterClick(event) {
      if (!this.readonly && !this.disabled) {
        if (this.isOpen) {
          this.setOptionByUpDownButtons(this.isOpen);
          this.isOpen = false;
        } else {
          this.indexOfSelectedOption = this.initIndexOfSelectedOption;
          this.isOpen = true;
        }
      }
    },
    onMouseClick(event) {
      if (!this.readonly && !this.disabled) {
        this.indexOfSelectedOption = this.initIndexOfSelectedOption;
        this.isOpen = !this.isOpen;
      }
    }
  },
  updated() {
    this.observe();
  },
  beforeMount() {
    this.setSelectedOption(this.selectedOptionId);
  },
  mounted() {
    this.triggerSelect = this.$refs.triggerSelect;
    window.addEventListener('resize', this.onWindowResizeCloseSelectList);
    document.addEventListener('mousedown', this.onDocumentEventCloseSelectList);
    document.addEventListener('mousewheel', this.onDocumentEventCloseSelectList);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onWindowResizeCloseSelectList);
    document.removeEventListener('mousedown', this.onDocumentEventCloseSelectList);
    document.removeEventListener('mousewheel', this.onDocumentEventCloseSelectList);
  }
};
</script>

<template>
  <label
    :tabindex="`${disabled || readonly ? -1 : 0}`"
    :class="['ctrl-select', { 'disabled': disabled, 'readonly': readonly }]"
    @keydown="onUpDown"
    @click="onMouseClick"
    @keyup.enter="onEnterClick"
    ref="triggerSelect"
  >

    <slot>
      <span class="option-name">{{ selectedOption.title }}</span>
      <i class="icon-select-arrows" />
    </slot>

    <transition name="fade">
      <ul v-if="isOpen" class="options-list scroll-box" ref="optionsListElement">
        <li
          v-for="(option, index) in options"
          :key="option.id"
          :data-id="option.id"
          @click="onOptionClick"
          :class="['option', { 'selected': index === indexOfSelectedOption }]"
        >
          {{ option.title }}
        </li>
      </ul>
    </transition>
  </label>
</template>
